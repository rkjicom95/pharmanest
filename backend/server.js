import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import router from "./routes/userRoute.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import upload from "./middleware/upload.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", router);
app.use("/uploads", express.static("uploads"));
// Medicine routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/address", addressRoutes);
// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
