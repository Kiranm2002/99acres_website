const mongoose = require("mongoose");
const Locality = require("../models/Locality");

mongoose.connect("mongodb://localhost:27017/realestate");

// 🔥 Replace with your actual Bangalore South ID
const bangaloreSouthId = "69a2b5330b1b388f878f6300";

const localities = [
  { name: "Jayanagar", city: bangaloreSouthId },
  { name: "JP Nagar", city: bangaloreSouthId },
  { name: "BTM Layout", city: bangaloreSouthId },
  { name: "Banashankari", city: bangaloreSouthId },
  { name: "Bannerghatta Road", city: bangaloreSouthId },
  { name: "Electronic City", city: bangaloreSouthId },
  { name: "Koramangala", city: bangaloreSouthId },
  { name: "HSR Layout", city: bangaloreSouthId },
  { name: "Sarjapur Road", city: bangaloreSouthId },
  { name: "Kanakapura Road", city: bangaloreSouthId },
  { name: "Basavanagudi", city: bangaloreSouthId },
  { name: "Uttarahalli", city: bangaloreSouthId },
  { name: "Kumaraswamy Layout", city: bangaloreSouthId },
  { name: "Arekere", city: bangaloreSouthId },
  { name: "Begur", city: bangaloreSouthId },
  { name: "Hulimavu", city: bangaloreSouthId },
  { name: "Padmanabhanagar", city: bangaloreSouthId },
  { name: "Talaghattapura", city: bangaloreSouthId },
  { name: "Anjanapura", city: bangaloreSouthId },
  { name: "Gottigere", city: bangaloreSouthId }
];

async function seedLocalities() {
  try {
    await Locality.insertMany(localities, { ordered: false });
    console.log("South Bangalore localities inserted ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedLocalities();