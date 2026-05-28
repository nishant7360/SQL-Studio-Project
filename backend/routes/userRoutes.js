import express from "express";
import { login, signin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/login", login);

export default router;
