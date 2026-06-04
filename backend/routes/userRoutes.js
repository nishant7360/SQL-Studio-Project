import express from "express";
import {
  changePassword,
  forgotPassword,
  getMe,
  login,
  logout,
  protect,
  resetPassword,
  signup,
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/updatePassword", protect, changePassword);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;
