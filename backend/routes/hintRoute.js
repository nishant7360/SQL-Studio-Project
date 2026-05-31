import express from "express";
import { hintGeneration } from "../controllers/hintController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/generateHint", hintGeneration);

export default router;
