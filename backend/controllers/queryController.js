import Assignment from "../models/assignmentModel.js";
import { pool } from "../utils/db.js";

export const queryExecute = async (req, res) => {
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

    let rewrittenQuery = query;
    for (const table of assignment.sampleTables) {
      const prefixed = `q${assignment.seedIndex}_${table.tableName}`;
      const regex = new RegExp(`\\b${table.tableName}\\b`, "gi");
      rewrittenQuery = rewrittenQuery.replace(regex, prefixed);
    }

    console.log("Rewritten query:", rewrittenQuery);

    const result = await pool.query(rewrittenQuery);
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

const normalizeValues = (data) => {
  return JSON.stringify(
    [...data]
      .map((row) =>
        Object.values(row)
          .map((val) => (isNaN(val) ? val : Number(val)))
          .sort(),
      )
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
  );
};

export const checkOutput = async (req, res) => {
  try {
    const { output, expectedOutput, id, query } = req.body;

    const user = req.user;

    const alreadySolved = user.totalQuestionAttempted.some(
      (attempt) =>
        attempt.questionId.toString() === id && attempt.isCorrect === true,
    );

    const isCorrect =
      output.length === expectedOutput.length &&
      normalizeValues(output) === normalizeValues(expectedOutput);

    if (isCorrect && !alreadySolved) user.totalQuestionSolved += 1;

    const existingAttempt = user.totalQuestionAttempted.find(
      (attempt) => attempt.questionId.toString() === id,
    );

    if (existingAttempt) {
      if (!existingAttempt.isCorrect) {
        existingAttempt.query = query;
        existingAttempt.isCorrect = isCorrect;
        existingAttempt.attemptedAt = Date.now();
      }
    } else {
      user.totalQuestionAttempted.push({
        questionId: id,
        query,
        isCorrect,
        attemptedAt: Date.now(),
      });
    }

    await user.save();

    if (output.length !== expectedOutput.length) {
      return res.status(200).json({ status: "fail", message: "Invalid Query" });
    }

    return res.status(200).json({ status: "success", isCorrect });
  } catch (error) {
    console.log("checkOutput error:", error.message);
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
