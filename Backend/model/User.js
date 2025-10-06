import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    creditBalance: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
