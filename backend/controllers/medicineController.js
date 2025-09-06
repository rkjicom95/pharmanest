import Medicine from "../models/medicineModel.js";

// @desc    Get all medicines
// @route   GET /api/medicines
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// @desc    Add new medicine
// @route   POST /api/medicines
export const addMedicine = async (req, res) => {
  try {
    const { name, price, category, oldPrice, description } = req.body;

    // multer से आने वाला file
    const img = req.file ? req.file.filename : null;

    const med = new Medicine({
      name,
      price,
      category,
      oldPrice,
      description,
      img,
    });

    await med.save();

    res.status(201).json(med);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Failed to add medicine" });
  }
};

// @desc    Get medicines by category
// @route   GET /api/medicines/category/:cat
export const getMedicinesByCategory = async (req, res) => {
  try {
    const medicines = await Medicine.find({ category: req.params.cat });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
};
