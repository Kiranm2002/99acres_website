const mongoose = require("mongoose");
const City = require("../models/City");

mongoose.connect("mongodb://localhost:27017/realestate");

const cities = [
  { name: "Bangalore North", state: "Karnataka" },
  { name: "Bangalore South", state: "Karnataka" },
  { name: "Bangalore East", state: "Karnataka" },
  { name: "Bangalore West", state: "Karnataka" },

  { name: "Mysore", state: "Karnataka" },
  { name: "Mangalore", state: "Karnataka" },
  { name: "Hubli", state: "Karnataka" },
  { name: "Belgaum", state: "Karnataka" },
  { name: "Gulbarga", state: "Karnataka" },
  { name: "Davanagere", state: "Karnataka" },
  { name: "Bellary", state: "Karnataka" },
  { name: "Bijapur", state: "Karnataka" },
  { name: "Shimoga", state: "Karnataka" },
  { name: "Tumkur", state: "Karnataka" },
  { name: "Raichur", state: "Karnataka" },
  { name: "Hassan", state: "Karnataka" },
  { name: "Udupi", state: "Karnataka" },
  { name: "Bidar", state: "Karnataka" },
  { name: "Chitradurga", state: "Karnataka" },
  { name: "Kolar", state: "Karnataka" }
];

async function seedData() {
  try {
    await City.insertMany(cities, { ordered: false });
    console.log("Cities inserted successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();