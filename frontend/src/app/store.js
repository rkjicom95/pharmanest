import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import medicineReducer from "../features/user/medicinesSlice.js";
import reviewReducer from "../features/review/reviewSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import addressReducer from "../features/address/addressSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
    review: reviewReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
  },
});
