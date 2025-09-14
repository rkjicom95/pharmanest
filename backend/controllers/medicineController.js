import Medicine from "../models/medicineModel.js";

export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

export const addMedicine = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      oldPrice,
      description,
      companyName,
      itemDetails,
      status,
      sideEffects,
      dosage,
      benefits,
      warning,
    } = req.body;

    // multer से आने वाला file
    const img = req.file ? req.file.filename : null;

    const med = new Medicine({
      name,
      price,
      category,
      oldPrice,
      description,
      img,
      companyName,
      itemDetails,
      status,
      sideEffects,
      dosage,
      warning,
      benefits,
    });

    await med.save();

    res.status(201).json(med);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Failed to add medicine" });
  }
};

export const getMedicinesByCategory = async (req, res) => {
  try {
    const medicines = await Medicine.find({ category: req.params.cat });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);

    // अगर रिकॉर्ड नहीं मिला
    if (!deleted) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json({ message: "Medicine deleted", _id: deleted._id }); // ✅ अब deleted defined है
  } catch (err) {
    console.error("❌ Delete Error:", err);
    res.status(500).json({ error: "Failed to delete medicine" });
  }
};

export const editMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    // अगर file upload हो रही है तो multer से आने वाली image use करो
    const img = req.file ? req.file.filename : undefined;

    // body से बाकी data लो
    const {
      name,
      price,
      category,
      oldPrice,
      description,
      companyName,
      itemDetails,
      status,
      sideEffects,
      dosage,
      benefits,
      warning,
    } = req.body;

    const updatedMed = await Medicine.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(price && { price }),
        ...(category && { category }),
        ...(oldPrice && { oldPrice }),
        ...(description && { description }),
        ...(companyName && { companyName }),
        ...(itemDetails && { itemDetails }),
        ...(status && { status }),
        ...(sideEffects && { sideEffects }),
        ...(dosage && { dosage }),
        ...(benefits && { benefits }),
        ...(warning && { warning }),
        ...(img && { img }),
      },
      { new: true }
    );

    if (!updatedMed) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(updatedMed);
  } catch (err) {
    console.error("❌ Error updating medicine:", err.message);
    res.status(500).json({ error: "Failed to update medicine" });
  }
};
