import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js"; // to clear cart after order (optional)

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      subtotal,
      discount = 0,
      deliveryCharges = 0,
      total,
      address,
      paymentMethod,
    } = req.body;

    if (!userId || !items || !items.length) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    // Optional: server-side price validation (recommended)
    // - fetch current prices for items from Medicine collection and recompute total
    // - if mismatch, return error

    const order = new Order({
      userId,
      items,
      subtotal,
      discount,
      deliveryCharges,
      total,
      address,
      paymentMethod,
      status: "Processing",
    });

    await order.save();

    // Optional: clear user's cart after successful order
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res
      .status(201)
      .json({ message: "Order created", orderId: order._id, order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
