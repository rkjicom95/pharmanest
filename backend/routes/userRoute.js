import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/userRegister", registerUser);
router.post("/userLogin", loginUser);
router.post("/google-login", googleLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.post("/verifyOtp", verifyOtp);

export default router;
