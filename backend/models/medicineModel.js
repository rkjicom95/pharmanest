import mongoose from "mongoose";
import { Counter } from "./counter.model.js";

const medicineSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    itemDetails: {
      type: String,
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
    status: {
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
    benefits: {
      type: String,
    },
    sideEffects: {
      type: String,
    },
    dosage: {
      type: String,
    },
    warning: {
      type: String,
    },
  },
  { timestamps: true }
);

// 🔹 Auto Increment ID (MA01, MA02...)
medicineSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      // Counter increment करो
      const counter = await Counter.findOneAndUpdate(
        { id: "medicine_id" }, // ✅ हर जगह यही ID इस्तेमाल करो
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const num = counter.seq.toString().padStart(2, "0");
      this._id = `MA${num}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
