import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartReducer } from "./cart/cartReducer";
import { userInfoReducer } from "./userInfo/userInfoReducer";

export const store = configureStore({
  reducer: combineReducers({
    cartReducer,
    userInfoReducer,
  }),
});
