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

    // -------- Area Details --------
    plotArea: {
      type: Number
    },

    areaUnit: {
      type: String,
      enum: ["sq.ft.", "sq.yards", "sq.m", "acres", "marla", "cents", "guntha"]
    },

    carpetArea: {
      type: Number
    },

    builtUpArea: {
      type: Number
    },

    superBuiltUpArea: {
      type: Number
    },

    // -------- Builder Floor Details --------
    builderFloorType: {
      type: String,
      enum: ["Single Floor", "Duplex", "Triplex"]
    },

    totalFloors: {
      type: Number
    },

    propertyOnFloor: {
      type: String
    },

    // -------- Room Details --------
    bedrooms: {
      type: Number
    },

    bathrooms: {
      type: Number
    },

    balconies: {
      type: String
    },

    // -------- Availability --------
    availabilityStatus: {
      type: String,
      enum: ["Ready to Move", "Under construction"]
    },

    ageOfProperty: {
      type: String,
      enum: ["0-1 years", "1-5 years", "5-10 years", "10+ years"]
    },

    possession: {
      type: String
    },

    // -------- Ownership --------
    ownershipType: {
      type: String,
      enum: ["Freehold", "Leasehold", "Co-operative society", "Power of Attorney"]
    },

    // -------- Price Details --------
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

      // ===== STEP 4 FIELDS =====
    video: {
      type: String, // store video file path or cloud URL
    },

    photos: 
      {
        type: [String],
        default:undefined // store image file paths
      },
    

    description: {
      type: String,
      // minlength: 30,
      maxlength: 5000,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    stepCompleted: {
      type: Number,
      default: 1,
    },
      // Step 5 - Other Details
    amenities: 
      {
        type: [String],
        default:undefined
      },
    
    overlooking: {
        type: [String],
        default:undefined
      },

    propertyFacing: {
      type: String,
    },
   
    locationAdvantages: {
        type: [String],
        default:undefined
      },
    otherFeatures: {
      corner: {
        type: Boolean,
        // default: false,
      },
      gated: {
        type: Boolean,
        // default: false,
      },
      wheelchair: {
        type: Boolean,
        // default: false,
      },
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