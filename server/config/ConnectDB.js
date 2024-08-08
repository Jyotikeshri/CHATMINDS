import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();

const URI = process.env.MONGO_URI;

const connect_db = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Something wrong with DB " + error);
  }
};

export default connect_db;
