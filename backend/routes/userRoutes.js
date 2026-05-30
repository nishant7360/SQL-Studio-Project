import express from "express";
import {
  getMe,
  login,
  protect,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", protect, getMe);

export default router;
