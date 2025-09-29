import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", addAddress);            // Add new address
router.get("/:userId", getAddresses);       // Get all addresses for a user
router.put("/update/:id", updateAddress);   // Update address
router.delete("/delete/:id", deleteAddress); // Delete address

export default router;
