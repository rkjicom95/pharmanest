import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//post review
export const postReview = createAsyncThunk(
  "reviews/postReview",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_MED_URL}/review/addReview`,
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Get medicines failed" }
      );
    }
  }
);

//get all reviews
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_MED_URL}/review`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Get medicines failed" }
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload)

      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default reviewSlice.reducer;
