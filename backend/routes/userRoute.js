import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/userRegister", registerUser);
router.post("/userLogin", loginUser);

export default router;
