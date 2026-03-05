const express = require("express");
const router = express.Router();
const verifyAccessToken = require("../middleware/verifyAccessToken")

const { getUserDetails } = require("../controllers/userController");

router.get("/:userId",verifyAccessToken, getUserDetails);

module.exports = router;