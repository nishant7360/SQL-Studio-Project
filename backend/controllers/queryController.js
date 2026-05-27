import Assignment from "../models/assignmentModel.js";
import { pool } from "../utils/db.js";

export const queryExecute = async (req, res) => {
  const createdTables = [];
  try {
    const { id, query } = req.body;
    console.log(id, query);
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
  }
};

const normalize = (data) =>
  JSON.stringify(
    data.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
  );

export const checkOutput = async (req, res) => {
  try {
    const { output, expectedOutput } = req.body;
    if (output.length !== expectedOutput.length) {
      return res.status(200).json({ status: "fail", message: "Invalid Query" });
    }
    const isCorrect = normalize(output) === normalize(expectedOutput);
    return res.status(200).json({ status: "success", isCorrect });
  } catch (error) {
    console.log("checkOutput error:", error.message);
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
