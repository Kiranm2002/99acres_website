const mongoose = require("mongoose");
const SubLocality = require("../models/SubLocality");
const PropertyProject = require("../models/propertProject");

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await PropertyProject.deleteMany({});

    const subLocalities = await SubLocality.find();

    for (const sub of subLocalities) {

      const projects = [

        // 3 Apartments
        {
          name: `${sub.name} Heights`,
          type: "Apartment",
          subLocalityId: sub._id
        },
        {
          name: `${sub.name} Residency`,
          type: "Apartment",
          subLocalityId: sub._id
        },
        {
          name: `${sub.name} Elite`,
          type: "Apartment",
          subLocalityId: sub._id
        },

        // 2 Societies
        {
          name: `${sub.name} Society Phase 1`,
          type: "Society",
          subLocalityId: sub._id
        },
        {
          name: `${sub.name} Enclave`,
          type: "Society",
          subLocalityId: sub._id
        }

      ];

      await PropertyProject.insertMany(projects);

      console.log(`✅ Added projects for ${sub.name}`);
    }

    console.log("🎉 All Projects Seeded Successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProjects();