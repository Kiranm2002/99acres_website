const mongoose = require("mongoose");

const localitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true
    }
  },
  { timestamps: true }
);

// Faster search
localitySchema.index({ name: 1 });

module.exports = mongoose.model("Locality", localitySchema);