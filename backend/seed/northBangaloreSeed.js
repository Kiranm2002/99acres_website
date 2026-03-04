const mongoose = require("mongoose");
const Locality = require("../models/Locality");

mongoose.connect("mongodb://localhost:27017/realestate");

// 🔥 Replace with your actual Bangalore North ID
const bangaloreNorthId = "69a668c30e28797f03f8a805";

const localities = [
  { name: "Hebbal", city: bangaloreNorthId },
  { name: "Yelahanka", city: bangaloreNorthId },
  { name: "Jakkur", city: bangaloreNorthId },
  { name: "Thanisandra", city: bangaloreNorthId },
  { name: "Hennur", city: bangaloreNorthId },
  { name: "RT Nagar", city: bangaloreNorthId },
  { name: "Sahakar Nagar", city: bangaloreNorthId },
  { name: "Vidyaranyapura", city: bangaloreNorthId },
  { name: "Nagavara", city: bangaloreNorthId },
  { name: "Kodigehalli", city: bangaloreNorthId },
  { name: "Devinagar", city: bangaloreNorthId },
  { name: "Ganga Nagar", city: bangaloreNorthId },
  { name: "Byatarayanapura", city: bangaloreNorthId },
  { name: "Sanjayanagar", city: bangaloreNorthId },
  { name: "Kogilu", city: bangaloreNorthId },
  { name: "Bagalur", city: bangaloreNorthId },
  { name: "Doddaballapur Road", city: bangaloreNorthId },
  { name: "Kempapura", city: bangaloreNorthId },
  { name: "Amrutahalli", city: bangaloreNorthId },
  { name: "Chikkajala", city: bangaloreNorthId }
];

async function seedLocalities() {
  try {
    await Locality.insertMany(localities, { ordered: false });
    console.log("North Bangalore localities inserted ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLocalities();