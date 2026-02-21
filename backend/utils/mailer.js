const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kiran7619401943@gmail.com",
    pass: "clxveqdaogcdslfw", // App Password
  },
  tls: { rejectUnauthorized: false },
});

module.exports = transporter;