const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Payment = require("../models/payment")
exports.createOrder = async (req, res) => {

  try {
    const {amount} = req.body
    const options = {
      amount: amount * 100, // (in paise)
      currency: "INR",
      receipt: "receipt_"+ Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.verifyPayment = async (req, res) => {

  const {
    userId,planName,amount,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentMethod
  } = req.body;

  if (!userId || !planName || !amount || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {

    const payment = await Payment.create({
         userId,
          planName,
          amount,
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          paymentStatus: "success", // or "created" depending on your flow
          paymentMethod: paymentMethod || "razorpay",
      });

    res.json({
      success: true,
      message: "Payment verified successfully",
      payment
    });

  } else {

    res.status(400).json({
      success: false,
      message: "Invalid signature"
    });

  }

};