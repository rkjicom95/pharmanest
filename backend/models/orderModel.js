import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      medicineId: String,
      name: String,
      price: Number,
      qty: Number,
      img: String,
    },
  ],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryCharges: { type: Number, default: 0 },
  total: { type: Number, required: true },
  address: {
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: { type: String }, // COD / UPI / Card
  status: { type: String, default: "Processing" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
