const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    state: {
      type: String,
      default: "Karnataka"
    },
    country: {
      type: String,
      default: "India"
    }
  },
  { timestamps: true }
);

// For faster autocomplete search
// citySchema.index({ name: 1 });

module.exports =   mongoose.model("City", citySchema);