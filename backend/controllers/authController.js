const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");


const otpStore = {};


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
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};


exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email].toString() === otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }
  res.json({ success: false });
};


exports.register = async (req, res) => {
  try {
    const { fullName, email, password, isAgent } = req.body;
    const profilePic = req.file ? req.file.filename : "";

  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
      isAgent: isAgent === "yes",
    });

    res.json({ success: true, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};