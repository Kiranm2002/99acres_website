const User = require("../models/User");
const transporter = require("../utils/mailer")

const passwordResetMail = async (req, res) => {
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

module.exports = passwordResetMail;