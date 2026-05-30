import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import fs from "fs";
import Assignment from "../models/assignmentModel.js";
import path from "path";
import { fileURLToPath } from "url";

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
      fs.readFileSync(
        path.join(
          path.dirname(fileURLToPath(import.meta.url)),
          "CipherSqlStudio-assignment.json",
        ),
        "utf-8",
      ),
    );

    const dataWithIndex = data.map((assignment, i) => ({
      ...assignment,
      seedIndex: i + 1,
    }));

    await Assignment.deleteMany();
    await Assignment.insertMany(dataWithIndex);

    console.log("Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();
