import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import medicineReducer from "../features/user/medicinesSlice.js";
import reviewReducer from "../features/review/reviewSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
    review: reviewReducer,
  },
});
