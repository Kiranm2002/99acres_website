const User = require("../models/User");
const transporter = require("../utils/mailer");

const otpStore = {}; // in-memory store

// Send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: "kiran7619401943@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    console.log(`OTP for ${email}: ${otp}`);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email] || otpStore[email].toString() !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  delete otpStore[email];

  const user = await User.findOne({ email });

  if (user) return res.json({ success: true, type: "login" });
  return res.json({ success: true, type: "register" });
};