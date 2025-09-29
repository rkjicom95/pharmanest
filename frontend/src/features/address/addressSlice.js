import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🟢 Add Address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_MED_URL}/address/add`,
        addressData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add address"
      );
    }
  }
);

// 🟡 Fetch User Addresses
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_MED_URL}/address/${userId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

// 🔵 Update Address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_MED_URL}/address/update/${id}`,
        updates
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update address"
      );
    }
  }
);

// 🔴 Delete Address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_MED_URL}/address/delete/${id}`
      );
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Address
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.addresses.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index > -1) {
          state.addresses[index] = action.payload;
        }
      })

      // Delete Address
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = state.addresses.filter(
          (a) => a._id !== action.payload
        );
      });
  },
});

export const { clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
