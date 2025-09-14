import express from "express";
import multer from "multer";

import {
  getMedicines,
  addMedicine,
  getMedicinesByCategory,
  deleteMedicine,
  editMedicine,
} from "../controllers/medicineController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Multer config

router.get("/", getMedicines);
router.post("/addMedicine", upload.single("image"), addMedicine);
router.put("/:id", upload.single("img"), editMedicine);
router.get("/category/:cat", getMedicinesByCategory);
router.delete("/:id", deleteMedicine);

export default router;
