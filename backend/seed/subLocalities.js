const mongoose = require("mongoose");
const Locality = require("../models/Locality");
const SubLocality = require("../models/subLocality");

const seedSubLocalities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await SubLocality.deleteMany({});

    const data = {

      "Hebbal": [
        "Hebbal Kempapura",
        "Hebbal Lake Area",
        "Ganga Nagar Extension",
        "Nagawara Junction",
        "Veerannapalya"
      ],

      "Yelahanka": [
        "Yelahanka New Town",
        "Yelahanka Old Town",
        "Attur Layout",
        "Kogilu Main Road",
        "Judicial Layout"
      ],

      "Jayanagar": [
        "Jayanagar 3rd Block",
        "Jayanagar 4th Block",
        "Jayanagar 5th Block",
        "South End Circle",
        "RV Road"
      ],

      "Whitefield": [
        "Hope Farm Junction",
        "ITPL Road",
        "EPIP Zone",
        "Kadugodi",
        "Varthur Road"
      ],

      "Indiranagar": [
        "100 Feet Road",
        "CMH Road",
        "HAL 2nd Stage",
        "Defence Colony",
        "Domlur Border"
      ],

      "Koramangala": [
        "Koramangala 1st Block",
        "Koramangala 3rd Block",
        "Koramangala 5th Block",
        "Koramangala 7th Block",
        "Sony World Junction"
      ],

      "HSR Layout": [
        "HSR Sector 1",
        "HSR Sector 2",
        "HSR Sector 3",
        "HSR Sector 6",
        "Agara Junction"
      ],

      "Rajajinagar": [
        "Rajajinagar 1st Block",
        "Rajajinagar 2nd Block",
        "Rajajinagar 4th Block",
        "Navrang Theatre Area",
        "Dr Rajkumar Road"
      ],

      "Banashankari": [
        "Banashankari 1st Stage",
        "Banashankari 2nd Stage",
        "Banashankari 3rd Stage",
        "Kathriguppe",
        "Uttarahalli Main Road"
      ],

      "Electronic City": [
        "Phase 1",
        "Phase 2",
        "Doddathogur",
        "Neeladri Nagar",
        "Shantipura"
      ]
    };

    for (const localityName in data) {

      const locality = await Locality.findOne({
        name: new RegExp("^" + localityName + "$", "i")
      });

      if (!locality) {
        console.log(`❌ Locality not found: ${localityName}`);
        continue;
      }

      const subLocalities = data[localityName].map(name => ({
        name,
        localityId: locality._id
      }));

      await SubLocality.insertMany(subLocalities);

      console.log(`✅ Seeded sublocalities for ${localityName}`);
    }

    console.log("🎉 All SubLocalities Seeded Successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSubLocalities();