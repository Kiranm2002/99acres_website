const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

// Login after OTP
exports.loginAfterOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      accessToken,
      user: {
        fullName: user.fullName,
        email: user.email,
        isAgent: user.isAgent,
        profilePic: user.profilePic || ""
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Register after OTP
exports.registerAfterOtp = async (req, res) => {
  try {
    const { email, fullName, isAgent } = req.body;
    const profilePic = req.file ? req.file.filename : "";

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const newUser = await User.create({
      fullName,
      email,
      profilePic,
      isAgent: isAgent === "yes"
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      accessToken,
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
        isAgent: newUser.isAgent,
        profilePic: newUser.profilePic || ""
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// Refresh Token
const jwt = require("jsonwebtoken");
const { REFRESH_SECRET_KEY } = require("../utils/jwt");

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "Refresh token required" });

  jwt.verify(token, REFRESH_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    try {
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const newAccessToken = generateAccessToken(user);
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
};