import fs from "fs";
import { pool } from "../utils/db.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "CipherSqlStudio-assignment.json");

const assignments = JSON.parse(fs.readFileSync(filePath, "utf-8"));

async function seedDatabase() {
  try {
    console.log("Connected to NeonDB");

    for (let i = 0; i < assignments.length; i++) {
      const assignment = assignments[i];

      for (const table of assignment.sampleTables) {
        const tableName = table.tableName;

        await pool.query(`
          DROP TABLE IF EXISTS ${tableName};
        `);

        const columns = table.columns
          .map((col) => `${col.columnName} ${col.dataType}`)
          .join(", ");

        await pool.query(`
          CREATE TABLE ${tableName} (
            ${columns}
          );
        `);

        console.log(`Created table: ${tableName}`);

        for (const row of table.rows) {
          const keys = Object.keys(row);
          const values = Object.values(row);

          const placeholders = values
            .map((_, index) => `$${index + 1}`)
            .join(", ");

          await pool.query(
            `
            INSERT INTO ${tableName}
            (${keys.join(", ")})
            VALUES (${placeholders})
            `,
            values,
          );
        }

        console.log(`Inserted rows into ${tableName}`);
      }
    }

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
