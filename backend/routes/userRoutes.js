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

import { updateInfo, uploadAvatar } from "../controllers/userController.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getMe", protect, getMe);
router.post("/updatePassword", protect, changePassword);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/update-info", protect, updateInfo);

router.post("/uploadAvatar", protect, upload.single("avatar"), uploadAvatar);
export default router;
