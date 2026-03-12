const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = require("../utils/generateTokens");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(411).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyAccessToken;