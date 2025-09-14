import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get all medicines
export const getMedicines = createAsyncThunk(
  "medicines/getMedicines",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_MED_URL}/medicines`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Get medicines failed" }
      );
    }
  }
);

const medicinesSlice = createSlice({
  name: "medicines",
  initialState: {
    medicines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(getMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default medicinesSlice.reducer;
