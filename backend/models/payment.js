const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  planName: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "INR"
  },

  razorpay_order_id: {
    type: String,
    required: true
  },

  razorpay_payment_id: {
    type: String,
    required: true
  },

  razorpay_signature: {
    type: String,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["created", "success", "failed"],
    default: "created"
  },

  paymentMethod: {
    type: String
  },

  transactionDate: {
    type: Date,
    default: Date.now
  }

},
{ timestamps: true }
);

module.exports =  mongoose.model("Payment", paymentSchema);