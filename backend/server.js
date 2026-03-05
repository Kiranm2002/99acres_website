const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv")
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const locationRoutes = require( "./routes/locationRoutes")
const propertyRoutes = require("./routes/propertyRoutes")
const userRoutes = require("./routes/userRoutes")
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
dotenv.config()
connectDB();

// Routes
app.use("/", authRoutes);
app.use("/location",locationRoutes)
app.use("/property",propertyRoutes)
app.use("/user",userRoutes)


app.listen(5000, () => console.log("Server running on port 5000"));