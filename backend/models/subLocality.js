// models/SubLocality.js

const mongoose = require("mongoose");

const subLocalitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  localityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locality",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("SubLocality", subLocalitySchema);