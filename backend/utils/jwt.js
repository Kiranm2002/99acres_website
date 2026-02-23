const jwt = require("jsonwebtoken");
const ACCESS_SECRET_KEY  = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET || "refresh_secret";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAgent: user.isAgent
    },
    ACCESS_SECRET_KEY,
    { expiresIn: "30m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    REFRESH_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

module.exports = { generateAccessToken, generateRefreshToken, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY };