const User = require("../models/User")

const checkEmail = async(req,res)=>{
    try{
        const {email} = req.body
        console.log("Incoming email:", email);
        if(!email){
            return res.status(400).json({
            success: false,
            message: "Email is required",
        });
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(200).json({success:true,exists:true,message:"Email already register"})
        }
        return res.status(200).json({success:true,exists:false,message:"Email available "})
    }catch(error){
        console.error("Check Email Error:", error);
        return res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}

module.exports = checkEmail