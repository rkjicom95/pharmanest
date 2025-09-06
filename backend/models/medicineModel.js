import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
