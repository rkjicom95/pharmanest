import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ userId, items, total }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_MED_URL}/orders/create`,
        {
          userId,
          items,
          total,
        }
      );
      return res.data; // ✅ backend से पूरा order object return होगा
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
        `${import.meta.env.VITE_API_MED_URL}/orders/${userId}`
      );
      return res.data; // ✅ backend orders की array return करेगा
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    status: "idle",
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
        state.currentOrder = action.payload; // ✅ नया order save कर दो
        state.orders.push(action.payload); // optional
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
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
