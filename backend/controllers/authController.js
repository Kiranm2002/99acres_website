const User = require("../models/User");
const bcrypt = require("bcrypt");
const transporter = require("../utils/mailer");


const {generateAccessToken,generateRefreshToken} = require("../utils/generateTokens")

const otpStore = {};

exports.checkEmail = async(req,res)=>{
    try{
        const {email} = req.body
        console.log("Incoming email:", email);
        if(!email){
            return res.status(400).json({
            success: false,
            message: "Email is required",
        });
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(200).json({success:true,exists:true,message:"Email already register"})
        }
        return res.status(200).json({success:true,exists:false,message:"Email available "})
    }catch(error){
        console.error("Check Email Error:", error);
        return res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}


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
    const { firstName, lastName, email, phone, password, isAgent } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      isAgent: isAgent === "yes",
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({ success: true, message: "User registered successfully",
      accessToken,refreshToken,
      user: {
              userId: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName
            }, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

exports.login = async(req,res)=>{
    try{
        const {email,password}= req.body

        if(!email || !password){
            return res.status(400).json({
            success: false,
            message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken, refreshToken,
            user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            },
        });

    }catch(error){
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

exports.resetPassword = async (req, res) => {
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

exports.passwordResetMail = async (req, res) => {
  try {
    const { email } = req.body;
    const resetLink = `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}`;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    
    // ✅ Send Email
    await transporter.sendMail({
      from: "kiran7619401943@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
    
          <div style="
            background-color: #f2f2f2;
            padding: 25px;
            border-radius: 6px;
          ">

            <!-- Top Sentence -->
            <p style="font-size: 15px; color: #333;">
             Hi <strong>${email}</strong>, Click on the button below to create a new password for your 
              <a href="http://localhost:5173/" 
                style="color:#0073e6; text-decoration:none;">
                99acres.com
              </a> account.
            </p>

            <!-- Yellow Button -->
            <div style="margin: 20px 0;">
              <a href="${resetLink}" 
                style="
                  background-color: #f4c542;
                  color: #000;
                  padding: 12px 22px;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 4px;
                  display: inline-block;
                ">
                Create a New Password
              </a>
            </div>

            <!-- Expiry Text -->
            <p style="font-size: 14px; color: #555;">
              The link is valid for a one-time use. It will expire after 72 hours.
            </p>

            <!-- Fallback URL -->
            <p style="font-size: 14px; color: #555;">
              If clicking the link doesn't work, copy this URL into your browser:
            </p>

            <p style="
                font-size: 13px;
                word-break: break-all;
              ">
              <a href="${resetLink}" style="color:#0073e6;">
                ${resetLink}
              </a>
            </p>

          </div>

          <!-- Footer -->
          <div style="margin-top: 20px; font-size: 14px; color: #333;">
            <p>Thanks & Regards</p>
            <p>
              <a href="http://localhost:5173/" 
                style="color:#0073e6; text-decoration:none;">
                99acres.com
              </a>
            </p>
          </div>

        </div>
        
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Password Reset Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};