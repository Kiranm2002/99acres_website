const mongoose = require("mongoose");

const propertyProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["Apartment", "Society"],
    required: true
  },

  subLocalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubLocality",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("PropertyProject", propertyProjectSchema);