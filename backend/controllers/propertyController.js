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

const updatePrimaryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { lookingFor, propertyType, category } = req.body;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // Update only provided fields
    property.lookingFor = lookingFor || property.lookingFor;
    property.propertyType = propertyType || property.propertyType;
    property.category = category || property.category;

    // Optional: update stepCompleted
    property.stepCompleted = 1;

    await property.save();

    res.status(200).json({
      message: "Property updated successfully",
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

      // Area
      plotArea,
      areaUnit,
      carpetArea,
      builtUpArea,
      superBuiltUpArea,

      // Builder Floor
      builderFloorType,
      totalFloors,
      propertyOnFloor,

      // Rooms
      bedrooms,
      bathrooms,
      balconies,

      // Availability
      availabilityStatus,
      ageOfProperty,
      possession,

      // Ownership
      ownerShip,

      // Price
      expectedPrice,
      pricePerSqft,
      allInclusivePrice,
      taxExcluded,
      priceNegotiable
    } = req.body;

    if (!propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    // ========== UPDATE FIELDS ==========

    // Area
    property.plotArea = plotArea;
    property.areaUnit = areaUnit;
    property.carpetArea = carpetArea;
    property.builtUpArea = builtUpArea;
    property.superBuiltUpArea = superBuiltUpArea;

    // Builder Floor
    property.builderFloorType = builderFloorType;
    property.totalFloors = totalFloors;
    property.propertyOnFloor = propertyOnFloor;

    // Rooms
    property.bedrooms = bedrooms;
    property.bathrooms = bathrooms;
    property.balconies = balconies;

    // Availability Logic
    property.availabilityStatus = availabilityStatus;

    if (availabilityStatus === "Ready to Move") {
      property.ageOfProperty = ageOfProperty;
      property.possession = null;
    }

    if (availabilityStatus === "Under construction") {
      property.possession = possession;
      property.ageOfProperty = null;
    }

    // Ownership
    property.ownerShip = ownerShip

    // Price
    property.expectedPrice = expectedPrice;
    property.pricePerSqft = pricePerSqft;
    property.allInclusivePrice = allInclusivePrice;
    property.taxExcluded = taxExcluded;
    property.priceNegotiable = priceNegotiable;

    // Step Completion
    property.stepCompleted = 3;

    await property.save();

    res.status(200).json({
      message: "Property profile saved successfully",
      property,
    });

  } catch (error) {
    console.error("Update profile error:", error);
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

const updatePhoto = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { description, email } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // ===== HANDLE FILES =====
    let videoPath = property.video;
    let photoPaths = property.photos || [];

    if (req.files) {
      if (req.files.video) {
        videoPath = req.files.video[0].path;
      }

      if (req.files.photos) {
        const newPhotos = req.files.photos.map(
          (file) => file.path
        );
        photoPaths = [...photoPaths, ...newPhotos];
      }
    }

    // ===== UPDATE FIELDS =====
    property.video = videoPath;
    property.photos = photoPaths;
    property.description = description;
    property.email = email;

    property.stepCompleted = 4;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Step 4 completed successfully",
      property,
    });
  } catch (error) {
    console.error("Step 4 Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateOtherDetails = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const {
      amenities,
      overlooking,
      propertyFacing,
      locationAdvantages,
      otherFeatures,
    } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Update fields
    property.amenities = amenities || [];
    property.overlooking = overlooking || [];
    property.propertyFacing = propertyFacing || "";
    // property.roadWidth = roadWidth || {};
    property.locationAdvantages = locationAdvantages || [];
    property.otherFeatures = otherFeatures || {};

    property.stepCompleted = 5;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Other details saved successfully",
      property,
    });
  } catch (error) {
    console.error("Update Other Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // Check if property exists
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Optional: store delete reason somewhere (if you have field)
    // property.deleteReason = reason;
    // await property.save();

    // Hard delete
    await Property.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error("Delete Property Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting property",
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("city")
      .populate("locality")
      .populate("subLocality")
      .populate("project");

    res.status(200).json({message:"success",properties});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleShortlist = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.shortlisted = !property.shortlisted;

    await property.save();

    res.status(200).json({
      success: true,
      shortlisted: property.shortlisted,
      message: property.shortlisted
        ? "Property shortlisted"
        : "Property removed from shortlist"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShortlistedProperties = async (req, res) => {
  try {

    const properties = await Property.find({ shortlisted: true })
    .populate("project", "name")
    .populate("subLocality", "name")
    .populate("locality", "name")
    .populate("city", "name");

    res.status(200).json({
      success: true,
      properties
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching shortlisted properties",
      error
    });
  }
};

module.exports = {
  createProperty, updatePropertyLocation,updatePropertyProfile,
  getPropertyById,updatePhoto,updateOtherDetails,updatePrimaryDetails,
  deleteProperty,getAllProperties,toggleShortlist,getShortlistedProperties
};