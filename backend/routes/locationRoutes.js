const express = require ("express");

const locationController = require ("../controllers/locationController.js")

const router = express.Router();

router.post("/city", locationController.createCity);
router.get("/cities", locationController.searchCities);

router.post("/locality", locationController.createLocality);
router.get("/localities", locationController.searchLocalities);
router.get("/sublocalities",locationController.searchSubLocalities)
router.get("/projects",locationController.searchProjects)

module.exports = router;