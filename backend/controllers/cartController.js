import Cart from "../models/cartModel.js";

// 🟢 Add item to cart
export const addToCart = async (req, res) => {
  const { userId, medicine } = req.body;

  if (!userId || !medicine?.medicineId) {
    return res
      .status(400)
      .json({ error: "User ID and medicine details are required." });
  }

  try {
    // 🟢 Find existing cart or create a new one
    let cart =
      (await Cart.findOne({ userId })) || new Cart({ userId, items: [] });

    // 🟢 Check if medicine already exists in cart
    const item = cart.items.find((i) => i.medicineId === medicine.medicineId);

    if (item) {
      // Update quantity: replace with provided qty or increment
      item.qty = medicine.qty ?? item.qty + 1;
    } else {
      // Add new medicine item
      cart.items.push({
        medicineId: medicine.medicineId,
        name: medicine.name,
        price: medicine.price,
        img: medicine.img,
        qty: medicine.qty || 1,
      });
    }

    await cart.save();

    // 🟢 Respond with updated cart (only relevant fields)
    res.status(200).json({
      userId: cart.userId,
      items: cart.items,
    });
  } catch (err) {
    console.error("❌ Add to Cart Error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

// 🔵 Get cart items
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// 🟠 Remove item
export const removeFromCart = async (req, res) => {
  const { userId, medicineId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((item) => item.medicineId !== medicineId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// backend/routes/cart.js
export const clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.json({ success: true, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
