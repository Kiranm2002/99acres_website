const mongoose = require("mongoose");
const Locality = require("../models/Locality");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

// 🔥 Replace with your actual Bangalore East ID
const bangaloreEastId = "69b0f8081f6ad8b85cf697ef";

const localities = [
  { name: "Whitefield", city: bangaloreEastId },
  { name: "Indiranagar", city: bangaloreEastId },
  { name: "Marathahalli", city: bangaloreEastId },
  { name: "KR Puram", city: bangaloreEastId },
  { name: "Mahadevapura", city: bangaloreEastId },
  { name: "CV Raman Nagar", city: bangaloreEastId },
  { name: "Varthur", city: bangaloreEastId },
  { name: "Brookefield", city: bangaloreEastId },
  { name: "Hoodi", city: bangaloreEastId },
  { name: "Kadugodi", city: bangaloreEastId },
  { name: "Ramamurthy Nagar", city: bangaloreEastId },
  { name: "Kaggadasapura", city: bangaloreEastId },
  { name: "Domlur", city: bangaloreEastId },
  { name: "Old Airport Road", city: bangaloreEastId },
  { name: "Bellandur", city: bangaloreEastId },
  { name: "Panathur", city: bangaloreEastId },
  { name: "HAL Layout", city: bangaloreEastId },
  { name: "AECS Layout", city: bangaloreEastId },
  { name: "Banaswadi", city: bangaloreEastId },
  { name: "Horamavu", city: bangaloreEastId }
];

async function seedLocalities() {
  try {
    await Locality.insertMany(localities, { ordered: false });
    console.log("East Bangalore localities inserted ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLocalities();