import express from "express";
import {
  getAllAssignments,
  getAssignmentById,
} from "../controllers/assignmentController.js";
const router = express.Router();

router.get("/get-all-assignments", getAllAssignments);
router.get("/get-assignment/:id", getAssignmentById);

export default router;
