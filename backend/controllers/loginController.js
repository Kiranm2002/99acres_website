const { connect } = require("mongoose");
const User = require("../models/User")
const bcrypt = require("bcryptjs");

const login = async(req,res)=>{
    try{
        const {email,password}= req.body
        console.log("login with :", email,"password:",password)
        if(!email || !password){
            return res.status(400).json({
            success: false,
            message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            // token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    }catch(error){
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

module.exports = login