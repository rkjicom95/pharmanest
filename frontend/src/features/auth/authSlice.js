import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveAuthData } from "../../utils/localStorage";
const API_URL = import.meta.env.VITE_API_URL;

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

// Logout API
export const logoutUser = createAsyncThunk(
  "users/logout",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/userLogout`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "users/forgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Forgot password failed" }
      );
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/resetPassword`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Reset password failed" }
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: null,
    token: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : null,
    loading: false,
    error: null,
    success: false,

    forgotMessage: null,
    resetSuccess: false,
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

      // ---------------- Forgot Password ----------------
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.forgotMessage = action.payload.message; // message from API
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
