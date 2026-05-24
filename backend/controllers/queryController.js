import Assignment from "../models/assignmentModel.js";
import { pool } from "../utils/db.js";

export const queryExecute = async (req, res) => {
  const createdTables = [];
  try {
    const { id, query } = req.body;

    if (!query.trim().toLowerCase().startsWith("select")) {
      return res.status(400).json({
        message: "Only SELECT queries allowed",
      });
    }

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({
        status: "fail",
        message: "Assignment not found",
      });
    }
    for (const table of assignment.sampleTables) {
      const tableName = table.tableName;
      createdTables.push(tableName);
      const columns = table.columns
        .map((col) => `${col.columnName} ${col.dataType}`)
        .join(", ");
      await pool.query(`
            CREATE TABLE ${tableName} (
              ${columns}
            )
          `);
      for (const row of table.rows) {
        const keys = Object.keys(row);
        const values = Object.values(row);
        const columnsString = keys.join(", ");
        const valuesString = values
          .map((val) => (typeof val === "string" ? `'${val}'` : val))
          .join(", ");
        await pool.query(`
              INSERT INTO ${tableName}
              (${columnsString})
              VALUES (${valuesString})
            `);
      }
    }
    const result = await pool.query(query);
    return res.status(200).json({
      status: "success",
      result: result.rows,
      expectedOutput: assignment.expectedOutput,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    for (const tableName of createdTables) {
      try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
      } catch (error) {
        console.log("Table delete error:", error.message);
      }
    }
  }
};

const normalize = (data) =>
  JSON.stringify(
    data.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
  );

export const checkOutput = async (req, res) => {
  try {
    const { output, expectedOutput } = req.body;
    const normalize = (data) =>
      JSON.stringify(
        data.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
      );

    const isCorrect = normalize(output) === normalize(expectedOutput);
    return res.status(200).json({
      status: "success",
      isCorrect,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
