import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Medicine from "./models/medicineModel.js";

dotenv.config(); // 🔑 .env load करेगा

// 1. MongoDB connect
await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("✅ MongoDB connected");

// 2. JSON file पढ़ो
const data = JSON.parse(fs.readFileSync("./medicines.json", "utf-8"));

// 3. Medicines insert करो (auto short IDs generate होंगी)
for (let med of data) {
  const newMed = new Medicine(med);
  await newMed.save(); // यहां pre("save") middleware _id: MA01, MA02 assign करेगा
}

console.log("✅ Medicines imported with short IDs");

// 4. Connection बंद करो
mongoose.connection.close();
