const mongoose = require("mongoose");
const Locality = require("../models/Locality");

mongoose.connect("mongodb://localhost:27017/realestate");

// 🔥 Replace with your actual Bangalore West ID
const bangaloreWestId = "69a2b5330b1b388f878f6302";

const localities = [
  { name: "Rajajinagar", city: bangaloreWestId },
  { name: "Malleshwaram", city: bangaloreWestId },
  { name: "Vijayanagar", city: bangaloreWestId },
  { name: "Nagarbhavi", city: bangaloreWestId },
  { name: "Basaveshwaranagar", city: bangaloreWestId },
  { name: "Magadi Road", city: bangaloreWestId },
  { name: "Kengeri", city: bangaloreWestId },
  { name: "Sunkadakatte", city: bangaloreWestId },
  { name: "Kamakshipalya", city: bangaloreWestId },
  { name: "Chandra Layout", city: bangaloreWestId },
  { name: "Yeshwanthpur", city: bangaloreWestId },
  { name: "Peenya", city: bangaloreWestId },
  { name: "Mahalakshmi Layout", city: bangaloreWestId },
  { name: "Nandini Layout", city: bangaloreWestId },
  { name: "Kurubarahalli", city: bangaloreWestId },
  { name: "Jalahalli", city: bangaloreWestId },
  { name: "Jalahalli West", city: bangaloreWestId },
  { name: "Hesaraghatta Road", city: bangaloreWestId },
  { name: "Herohalli", city: bangaloreWestId },
  { name: "Andrahalli", city: bangaloreWestId }
];

async function seedLocalities() {
  try {
    await Locality.insertMany(localities, { ordered: false });
    console.log("West Bangalore localities inserted ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLocalities();