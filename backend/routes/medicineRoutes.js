import express from "express";
import {
  getMedicines,
  addMedicine,
  getMedicinesByCategory,
  deleteMedicine,
} from "../controllers/medicineController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getMedicines);
router.post("/addMedicine", upload.single("img"), addMedicine);
router.get("/category/:cat", getMedicinesByCategory);
router.delete("/:id", deleteMedicine);

export default router;
