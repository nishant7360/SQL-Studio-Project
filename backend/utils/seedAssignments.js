import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import fs from "fs";

import Assignment from "../models/assignmentModel.js";

dotenv.config();

const seedData = async () => {
  try {
    const DB = process.env.DB_URL.replace(
      "<db_password>",
      process.env.DB_PASSWORD,
    );
    await mongoose.connect(DB);

    console.log("MongoDB Connected");

    const data = JSON.parse(
      fs.readFileSync("CipherSqlStudio-assignment.json", "utf-8"),
    );

    await Assignment.deleteMany();

    await Assignment.insertMany(data);

    console.log("Data Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
