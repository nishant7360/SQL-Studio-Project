import Assignment from "../models/assignmentModel.js";

export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    return res.status(200).json({
      status: "success",
      results: assignments.length,
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({
        status: "fail",
        message: "Assignment does't exist",
      });
    }
    return res.status(200).json({
      status: "success",
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
