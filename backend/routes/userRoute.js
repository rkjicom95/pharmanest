import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/userRegister", registerUser);
router.post("/userLogin", loginUser);
router.post("/google-login", googleLogin);

export default router;
