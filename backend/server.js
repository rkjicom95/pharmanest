import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import router from "./routes/userRoute.js";

// config
dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", router);

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
