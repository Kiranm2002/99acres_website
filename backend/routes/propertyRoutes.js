const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload")
const verifyAccessToken = require("../middleware/verifyAccessToken")

const { createProperty,updatePropertyLocation,
    updatePropertyProfile,getPropertyById,updatePhoto,
    updateOtherDetails,updatePrimaryDetails,deleteProperty } = require("../controllers/propertyController");


router.post("/create",verifyAccessToken, createProperty);
router.put("/update-location",verifyAccessToken,updatePropertyLocation)
router.put("/update-profile",verifyAccessToken,updatePropertyProfile)
router.get("/:id", getPropertyById);
router.put("/photo-details/:propertyId", verifyAccessToken,upload.fields([
    {name:"video",maxCount:1},
    {name:"photos",maxCount:50},
]),updatePhoto)
router.put("/other-details/:propertyId",verifyAccessToken,updateOtherDetails)
router.put("/update-primaryDetails/:id",verifyAccessToken,updatePrimaryDetails)
router.delete("/delete-property/:id",verifyAccessToken,deleteProperty)

module.exports = router;