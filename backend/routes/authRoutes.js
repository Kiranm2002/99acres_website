const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");
const checkEmail = require ("../controllers/checkEmail")
// const tokenController = require("../controllers/tokenController")
const verifyAccessToken = require("../middleware/verifyAccessToken")

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/register", upload.single("profilePic"), authController.register);
// router.post("/login",tokenController)
router.post("/check-email",checkEmail)
router.get("/me", verifyAccessToken, (req, res) => {
  res.json({ user: req.user });
});
router.post("/refresh-token",authController.refreshToken)
router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;