import express from "express";
import { checkOutput, queryExecute } from "../controllers/queryController.js";

const router = express.Router();

router.post("/execute", queryExecute);
router.post("/checkOutput", checkOutput);

export default router;
