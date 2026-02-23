const router = require("express").Router();
const { loginAfterOtp, registerAfterOtp, refreshToken } = require("../controllers/authController");

router.post("/login-after-otp", loginAfterOtp);
router.post("/register-after-otp", registerAfterOtp);
router.get("/refresh-token", refreshToken);

module.exports = router;