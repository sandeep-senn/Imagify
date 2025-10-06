import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      default: 5,
    },
    payment : {
        type : Boolean,
        default : false
    },
    date : {
        type : Number,
    }
  },
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
