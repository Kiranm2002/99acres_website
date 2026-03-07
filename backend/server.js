const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const locationRoutes = require( "./routes/locationRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const userRoutes = require("./routes/userRoutes")
const paymentRoutes = require("./routes/paymentRoutes");
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB

connectDB();

// Routes
app.use("/", authRoutes);
app.use("/location",locationRoutes)
app.use("/property",propertyRoutes)
app.use("/user",userRoutes)
app.use("/payment", paymentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));