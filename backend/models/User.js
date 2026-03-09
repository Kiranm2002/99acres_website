const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone:{type:String,required:true},
  password: { type: String, required: true },
  isAgent: { type: Boolean, default: false },
  refreshToken: { type: String },

  //edit profile
  phone2: { type: String },
  phone3: { type: String },

  city: { type: String },
  address: { type: String },

  landlineNo: { type: String },

  gstin: { type: String },

  youAre: {
    type: String,
    enum: ["Owner", "Agent", "Builder", "Other"]
  },

  whatsappConsent: { type: Boolean, default: false },

  subscribeConsent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);