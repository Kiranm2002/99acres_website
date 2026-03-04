const City = require("../models/City.js");
const Locality = require("../models/Locality.js");
const PropertyProject = require("../models/propertProject.js")
const SubLocality = require("../models/subLocality.js")

// Create City (for Postman use)
exports.createCity = async (req, res) => {
  try {
    const  name  = req.body;

    const city = await City.create({ name });

    res.status(201).json({success:true,city:city});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Search Cities (Autocomplete)
exports.searchCities = async (req, res) => {
  try {
    const { query } = req.query;

    const cities = await City.find({
      name: new RegExp( "^"+ query, "i")   
    }).limit(10);

    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create Locality (Postman use)
exports.createLocality = async (req, res) => {
  try {
    const { name, pincode, cityId } = req.body;

    const locality = await Locality.create({
      name,
      pincode,
      city: cityId
    });

    res.status(201).json({success:true,locality:locality});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//Search Localities (Based on City)
exports.searchLocalities = async (req, res) => {
  try {
    const { query, cityId } = req.query;

    const filter = {
      name: new RegExp("^" + query, "i")
    };

    if (cityId) {
      filter.city = cityId;
    }

    const localities = await Locality.find(filter)
      .populate("city", "name")
      .limit(10);

    res.json(localities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchSubLocalities = async (req, res) => {
  try {
    const { query, localityId } = req.query;

    const subLocalities = await SubLocality.find({
      localityId,
      name: new RegExp( "^" + query, "i")
    }).limit(10);

    res.json(subLocalities);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchProjects = async (req, res) => {
  try {

    const { query, subLocalityId } = req.query;
    // console.log(query,subLocalityId)

    
    if (!query || !subLocalityId) {
      return res.json([]);
    }

    const projects = await PropertyProject.find({
      subLocalityId: subLocalityId,
      name: new RegExp("^"+ query, "i")
    })
    .limit(10);

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};