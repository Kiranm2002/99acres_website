const express = require("express");
const router = express.Router();
const verifyAccessToken = require("../middleware/verifyAccessToken")

const { getUserDetails, updateUserProfile } = require("../controllers/userController");

router.get("/:userId",verifyAccessToken, getUserDetails);
router.put("/:id",verifyAccessToken,updateUserProfile)

module.exports = router;