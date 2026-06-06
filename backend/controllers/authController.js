import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import cookieOptions from "../utils/cookieOption.js";
import { promisify } from "util";
import otpGenerator from "otp-generator";
import { sendEmail } from "../utils/sendMail.js";

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("1. received:", name, email);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Provide all necessary fields" });
    }

    const user = await User.create({ name, email, password });
    console.log("2. user created:", user._id);

    await sendEmail(user.email, "welcome", { name: user.name });
    console.log("3. email sent");

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    console.log("signup error:", error);
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        statu: "fail",
        message: "Provide both email and password.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        statu: "fail",
        message: "User with this email does't exist",
      });
    }
    console.log(`${user?.name} loggedin with ${user?.email}`);

    const isValid = await user.checkPassword(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        status: "fail",
        message: "Provide valid email and password",
      });
    }

    const token = jwtToken(user._id);
    res.cookie("jwt", token, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("login error :  ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    ...cookieOptions,
    maxAge: 0,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(400).json({
        statu: "fail",
        message: "You are not logged in. Please log in to continue.",
      });
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);

    if (!user) {
      return res.status(400).json({
        statu: "fail",
        message: "User belong to this token does't exist",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Protect error :  ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all the fields!",
      });
    }

    const user = req.user;

    const isCorrect = await user.checkPassword(currentPassword, user.password);
    if (!isCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide correct current password",
      });
    }

    user.password = newPassword;
    await user.save();
    console.log("saved password:", user.password);
    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Change password error : ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User with this email doesn't exist!",
      });
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(user.email, "forgotPassword", { name: user.name, otp });
    return res.status(200).json({
      status: "success",
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log("Forgot password error : ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ status: "fail", message: "Invalid OTP" });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ status: "fail", message: "OTP has expired" });
    }

    return res.status(200).json({ status: "success", message: "OTP verified" });
  } catch (error) {
    console.log("Verify OTP error : ", error);
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({
        status: "fail",
        message: "OTP has expired",
      });
    }

    user.password = newPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Reset password error : ", error);
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
