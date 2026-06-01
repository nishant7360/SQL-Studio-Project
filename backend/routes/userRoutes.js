import express from "express";
import {
  changePassword,
  getMe,
  login,
  logout,
  protect,
  signup,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/updatePassword", protect, changePassword);
router.post("/logout", logout);

export default router;
