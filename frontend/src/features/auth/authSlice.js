import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveAuthData } from "../../utils/localStorage";
const API_URL = import.meta.env.VITE_API_URL;

// ---------------- Google Login ----------------
// Google Login
export const loginWithGoogle = createAsyncThunk(
  "users/loginWithGoogle",
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/google-login`, { idToken });

      // localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data?.data?.name,
          email: res.data?.data?.email,
        })
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Google login failed" }
      );
    }
  }
);

// Login API
export const loginUser = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/userLogin`, userData);
      saveAuthData(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Register API
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/userRegister`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Register failed" }
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  // initialState: {
  //   users: null,
  //   token: localStorage.getItem("token") || null,
  //   loading: false,
  //   error: null,
  //   success: false,
  // },
  initialState: {
    users: null,
    token: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.users = null;
      state.token = null;
      clearAuthData(); // ✅ remove auth from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------- Google Login ----------------
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
