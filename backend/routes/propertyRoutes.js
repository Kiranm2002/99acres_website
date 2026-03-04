const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload")

const { createProperty,updatePropertyLocation,
    updatePropertyProfile,getPropertyById,updatePhoto,
    updateOtherDetails,updatePrimaryDetails,deleteProperty } = require("../controllers/propertyController");


router.post("/create", createProperty);
router.put("/update-location",updatePropertyLocation)
router.put("/update-profile",updatePropertyProfile)
router.get("/:id", getPropertyById);
router.put("/photo-details/:propertyId", upload.fields([
    {name:"video",maxCount:1},
    {name:"photos",maxCount:50},
]),updatePhoto)
router.put("/other-details/:propertyId",updateOtherDetails)
router.put("/update-primaryDetails/:id",updatePrimaryDetails)
router.delete("/delete-property/:id",deleteProperty)

module.exports = router;