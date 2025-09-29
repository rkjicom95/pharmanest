import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // User की पहचान
    items: [
      {
        medicineId: { type: String, required: true },
        name: String,
        price: Number,
        qty: { type: Number, default: 1 },
        img: String,
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
