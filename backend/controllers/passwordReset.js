// controllers/resetPassword.js

const bcrypt = require("bcrypt");
const User = require("../models/User");

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // if (password.length < 8) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password must be at least 8 characters",
    //   });
    // }

    // 2. Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = resetPassword;