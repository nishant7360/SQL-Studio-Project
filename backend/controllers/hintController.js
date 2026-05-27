import Assignment from "../models/assignmentModel.js";
import groq from "../utils/groq.js";

export const hintGeneration = async (req, res) => {
  try {
    const { assignmentId, userQuery, previousHints = [] } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({
        status: "fail",
        message: "Assignment not found",
      });
    }

    if (previousHints.length >= 3) {
      return res.status(500).json({
        status: "fail",
        message: "3 Hints already generated",
      });
    }

    const difficulty = assignment.description?.toLowerCase();
    let difficultyPrompt = "";

    if (difficulty === "easy") {
      difficultyPrompt = `
        This is a beginner SQL question.

        Rules:
        - Keep hints extremely simple
        - Use beginner-friendly language
        - Keep hints under 15 words
        - Focus on WHERE clause and filtering
        - Avoid advanced SQL terms
        - Do not mention HAVING, JOIN, subqueries, CTEs, or aggregates
        `;
    } else if (difficulty === "medium") {
      difficultyPrompt = `
        This is an intermediate SQL question.

        Rules:
        - Give moderately detailed hints
        - Keep hints under 15 words
        - Mention useful SQL concepts if necessary
        - Keep hints concise
        `;
    } else if (difficulty === "hard") {
      difficultyPrompt = `
        This is an advanced SQL question.

        Rules:
        - More technical hints are allowed
        - Keep hints under 15 words
        - Mention optimization or advanced SQL concepts if useful
        - Still avoid giving full solution
        `;
    }

    const hintNumber = previousHints.length + 1;

    const prompt = `
        You are an SQL tutor helping students.

        ${difficultyPrompt}

        GLOBAL RULES:
        - Never provide the final SQL query
        - Never provide complete solution
        - This is Hint ${hintNumber} of 3 — be progressively more specific than previous hints
        - Each hint must be completely different from previous hints
        - Keep hints concise and under 15 words
        - Do not explain unnecessary theory
        - If the user query is already correct or very close, say "You're on the right track!" instead of a new hint

        Question:
        ${assignment.question}

        Expected answer involves:
        ${assignment.expectedOutput?.value ? `Returning ${assignment.expectedOutput.value.length} rows with columns: ${Object.keys(assignment.expectedOutput.value[0] || {}).join(", ")}` : ""}

        User Query:
        ${userQuery || "No query yet"}

        Previous Hints:
        ${previousHints.length > 0 ? previousHints.map((h, i) => `Hint ${i + 1}: ${h}`).join("\n") : "None"}

        Return ONLY the hint text. No explanation, no numbering, no prefix.
        `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const hint = completion.choices[0].message.content;

    return res.status(200).json({
      status: "success",
      hint,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
