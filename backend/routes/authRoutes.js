const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");
const verifyAccessToken = require("../middleware/verifyAccessToken")


router.post("/check-email",authController.checkEmail)
router.post("/login",authController.login)
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/register", authController.register);
router.post("/password-reset-mail",authController.passwordResetMail)
router.post("/reset-password",authController.resetPassword)
router.post("/refresh-token",authController.refreshToken)

router.get("/me", verifyAccessToken, (req, res) => {
  res.json({ user: req.user });
});


module.exports = router;