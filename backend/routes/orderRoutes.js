import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getOrderByItemId,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

// Create new order
router.post("/create", createOrder);

// Get all orders (admin)
router.get("/", getAllOrders);

// Get orders by userId
router.get("/user/:userId", getOrdersByUser);

// Get order by orderId
router.get("/:orderId", getOrderById);

// Get order by itemId
router.get("/item/:itemId", getOrderByItemId);

// Update order status
router.put("/:orderId/status", updateOrderStatus);

export default router;
