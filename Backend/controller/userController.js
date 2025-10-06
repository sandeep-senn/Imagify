import FormData from "form-data";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import Razorpay from 'razorpay'
import Transaction from "../model/transactionModel.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    // JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  try {
    res.json({ success: true, msg: "User logged out successfully" });
  } catch (error) {
    res.json({ success: false, msg: "Logout error occured" });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    console.error("Error fetching user credits:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const generateImage = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ success: false, msg: "Prompt is missing" });
    }

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, msg: "User not found" });

    if (user.creditBalance <= 0) {
      return res.json({ 
        success: false, 
        msg: "No credit balance", 
        creditBalance: user.creditBalance 
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    let response;
    try {
      response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            "x-api-key": process.env.CLIPDROP_API,
          },
          responseType: "arraybuffer",
        }
      );
    } catch (apiError) {
      console.error("ClipDrop API error:", apiError.message);
      if (apiError.response && apiError.response.status === 403) {
        return res.json({ 
          success: false, 
          msg: "ClipDrop API key invalid or unauthorized (403). Credit not deducted.", 
          creditBalance: user.creditBalance 
        });
      }

      return res.json({ 
        success: false, 
        msg: "Failed to generate image. Credit not deducted.", 
        creditBalance: user.creditBalance 
      });
    }

    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    res.json({
      success: true,
      message: "Image generated",
      creditBalance: updatedUser.creditBalance,
      resultImage
    });

  } catch (err) {
    console.error(err);
    res.json({ success: false, msg: err.message });
  }
};

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await User.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, plan, amount;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Plan not found" });
    }

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date: Date.now(),
    };

    const newTransaction = await Transaction.create(transactionData);

    const options = {
      amount: amount * 100, 
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order)=> {
        if(error){
          console.log(error)
          return res.json({success:false, message : error})
        }
        res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};