import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    { userId, items, totalAmount, address, payment },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_MED_URL}/orders/create`,
        {
          userId,
          items,
          totalAmount,
          address,
          payment,
          status: "Processing", // default status
        }
      );
      return res.data; // backend se pura order object return hoga
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// 🟡 Fetch User Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_MED_URL}/orders/user/${userId}`
      );
      return res.data; // backend orders array return karega
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// 🟣 Update Order Status
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_MED_URL}/orders/${orderId}/status`,
        { status }
      );
      return res.data; // updated order return karega
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // 📌 Update Order
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        // orders list me bhi update karo
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        // currentOrder bhi update
        if (state.currentOrder?._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
