const express = require("express");
const router = express.Router();

const { createProperty,updatePropertyLocation,
    updatePropertyProfile,getPropertyById } = require("../controllers/propertyController");


router.post("/create", createProperty);
router.put("/update-location",updatePropertyLocation)
router.put("/update-profile",updatePropertyProfile)
router.get("/:id", getPropertyById);

module.exports = router;