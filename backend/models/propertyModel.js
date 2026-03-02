const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // ================= USER =================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // you can make true after auth integration
    },

    // ================= STEP 1 =================
    lookingFor: {
      type: String,
      enum: ["Sell", "Rent / Lease", "PG"],
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Residential", "Commercial"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    // ================= STEP 2 (Location) =================

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    //   default: null, // required only after step 2
    },

    locality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Locality",
    //   default: null,
    },

    subLocality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubLocality",
    //   default: null, // optional
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyProject",
    //   default: null, // optional
    },
    
    // ================= STEP 3 (Property Profile) =================

    // Area Details
    plotArea: {
      type: Number
    },
    areaUnit: {
      type: String
    },

    // Dimensions (optional)
    plotLength: {
      type: Number
    },
    plotBreadth: {
      type: Number
    },

    // Floors
    floorsAllowed: {
      type: Number
    },

    // Boundary
    boundaryWall: {
      type: String,
      enum: ["Yes", "No"]
    },

    // Open sides
    openSides: {
      type: String
    },

    // Construction
    construction: {
      type: String,
      enum: ["Yes", "No"]
    },

    // Possession
    possession: {
      type: String
    },

    // Ownership
    ownerShip: {
      type: String
    },

    // Authority (optional)
    authority: {
      type: String
    },

    // Price Details
    expectedPrice: {
      type: Number
    },

    pricePerSqft: {
      type: Number
    },

    allInclusivePrice: {
      type: Boolean,
      default: false
    },

    taxExcluded: {
      type: Boolean,
      default: false
    },

    priceNegotiable: {
      type: Boolean,
      default: false
    },
    // ================= PROGRESS TRACKING =================
    stepCompleted: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);