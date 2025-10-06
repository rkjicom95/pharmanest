import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_MED_URL}/cart/${userId}`
  );
  return res.data; // ✅ Backend returns { userId, items: [...] }
});

// 🟡 Add To Cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ userId, medicine }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_MED_URL}/cart/add`,
      {
        userId,
        medicine,
      }
    );
    return res.data; // ✅ Backend returns entire cart, not medicine
  }
);

// 🔴 Remove From Cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ userId, medicineId }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_MED_URL}/cart/remove`,
      {
        userId,
        medicineId,
      }
    );
    return res.data;
  }
);
// 🟣 Clear Cart (पूरी cart empty करो - Order place hone ke baad)
export const clearCartAsync = createAsyncThunk("cart/clear", async (userId) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_MED_URL}/cart/clear`,
    { userId }
  );
  return res.data; // backend से empty cart आएगी
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // ✅ Order place hone ke baad cart ko empty karne ke liye
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 📥 Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ➕ Add To Cart
      .addCase(addToCart.pending, (state, action) => {
        // 🟢 UI तुरंत बदलें
        const { medicine } = action.meta.arg;
        const idx = state.items.findIndex(
          (i) => i.medicineId === medicine.medicineId
        );

        if (idx >= 0) {
          state.items[idx].qty = medicine.qty; // local qty अपडेट
        } else {
          state.items.push({ ...medicine });
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // ✅ Backend से आया data → केवल sync करें
        state.items = action.payload.items || state.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ❌ Remove From Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
      })

      // 🟣 Clear Cart from backend
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
