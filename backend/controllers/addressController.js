import Address from "../models/address.js";

// 🟢 Add Address
export const addAddress = async (req, res) => {
  try {
    const { userId, name, mobile, street, city, state, pincode, landmark } =
      req.body;

    const newAddress = new Address({
      userId,
      name,
      mobile,
      street,
      city,
      state,
      pincode,
      landmark,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add address", error: err.message });
  }
};

// 🟡 Get All Addresses for User
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.status(200).json(addresses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: err.message });
  }
};

// ✏️ Update Address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update address", error: err.message });
  }
};

// ❌ Delete Address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: err.message });
  }
};