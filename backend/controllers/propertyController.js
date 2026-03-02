const Property = require("../models/propertyModel");

// Create property - Step 1
const createProperty = async (req, res) => {
  try {
    const { lookingFor, propertyType, category } = req.body;

    if (!lookingFor || !propertyType || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const property = await Property.create({
      lookingFor,
      propertyType,
      category,
    });
    property.stepCompleted = 1;
    res.status(201).json({
      message: "Primary details saved successfully",
      propertyId: property._id,
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// ================= STEP 2 - SAVE LOCATION =================
const updatePropertyLocation = async (req, res) => {
  try {
    const { propertyId, city, locality, subLocality, project } = req.body;

    // 1️⃣ Validate required fields
    if (!propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
      });
    }

    if (!city || !locality) {
      return res.status(400).json({
        message: "City and Locality are required",
      });
    }

    // 2️⃣ Find property
    const property = await Property.findByIdAndUpdate(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // 3️⃣ Update location fields
    property.city = city;
    property.locality = locality;
    property.subLocality = subLocality || null;  // optional
    property.project = project || null;          // optional

    property.stepCompleted = 2;

    await property.save();

    res.status(200).json({
      message: "Location details saved successfully",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
  // ================= STEP 3 - Property Profile =================

const updatePropertyProfile = async (req, res) => {
  try {
    

    const {
      propertyId,
      plotArea,
      areaUnit,
      plotLength,
      plotBreadth,
      floorsAllowed,
      boundaryWall,
      openSides,
      construction,
      possession,
      ownerShip,
      authority,
      expectedPrice,
      pricePerSqft,
      allInclusivePrice,
      taxExcluded,
      priceNegotiable,
    } = req.body;

    const property = await Property.findByIdAndUpdate(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Update fields
    property.plotArea = plotArea;
    property.areaUnit = areaUnit;
    property.plotLength = plotLength;
    property.plotBreadth = plotBreadth;
    property.floorsAllowed = floorsAllowed;
    property.boundaryWall = boundaryWall;
    property.openSides = openSides;
    property.construction = construction;
    property.possession = possession;
    property.ownerShip = ownerShip;
    property.authority = authority;
    property.expectedPrice = expectedPrice;
    property.pricePerSqft = pricePerSqft;
    property.allInclusivePrice = allInclusivePrice;
    property.taxExcluded = taxExcluded;
    property.priceNegotiable = priceNegotiable;

    property.stepCompleted = 3;

    await property.save();

    res.status(200).json({
      message: "Property profile saved successfully",
      property,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("city")
      .populate("locality")
      .populate("subLocality")
      .populate("project")

      if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty, updatePropertyLocation,updatePropertyProfile,getPropertyById
};