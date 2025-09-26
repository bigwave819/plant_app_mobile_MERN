import mongoose from "mongoose";
import dotenv from "dotenv";
import Plant from "./models/plant.model.js";
import dummyData from "./dummy.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Plant.deleteMany();
    await Plant.insertMany(dummyData);
    console.log("🌱 Dummy data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
