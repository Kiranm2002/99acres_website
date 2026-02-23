const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");
const {generateAccessToken,generateRefreshToken} = require("../utils/jwt")

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


// exports.verifyOtp = (req, res) => {
//   const { email, otp } = req.body;
//   if (otpStore[email] && otpStore[email].toString() === otp) {
//     delete otpStore[email];
//     return res.json({ success: true });
//   }
//   res.json({ success: false });
// };

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email] || otpStore[email].toString() !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  delete otpStore[email];

  let user = await User.findOne({ email });

  if (!user) {
    // User not registered yet → ask frontend to show registration form
    return res.json({ success: true, type: "register", message: "OTP verified, please complete registration" });
  }

  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    maxAge: 1*24 * 60 * 60 * 1000 
  });

  return res.json({
    success: true,
    type: "login",
    accessToken,
    user: {
      fullName: user.fullName,
      
    }
  });
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

exports.refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};