const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error("Error fetching user:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

exports.updateUserProfile = async(req,res)=>{
  try{
    const {id} = req.params
     const {
      youAre, name, email,
      phone1, phone2, phone3,
      city, address, landlineNo,
      whatsappConsent, subscribeConsent, gstin
    } = req.body;

     // split name into firstName and lastName
    let firstName = "";
    let lastName = "";

    if (name) {
      const parts = name.trim().split(" ");
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone: phone1,
        phone2,
        phone3,
        city,
        address,
        landlineNo,
        whatsappConsent,
        subscribeConsent,
        gstin,
        youAre
      },
      { new: true }
    );
    
     if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
   
  }catch(error){
    console.error("Error fetching user:", error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}