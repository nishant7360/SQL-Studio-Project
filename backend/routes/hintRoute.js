import express from "express";
import { hintGeneration } from "../controllers/hintController.js";

const router = express.Router();

router.post("/generateHint", hintGeneration);

export default router;
