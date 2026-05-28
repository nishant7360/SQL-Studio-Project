import express from "express";
import { checkOutput, queryExecute } from "../controllers/queryController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/execute", protect, queryExecute);
router.post("/checkOutput", checkOutput);

export default router;
