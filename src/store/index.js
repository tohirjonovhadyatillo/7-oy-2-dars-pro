import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";
import todoReducer from "./slices/todoSlice";
import playersReducer from "./slices/playersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    modal: modalReducer,
    todos: todoReducer,
    players: playersReducer,
  },
});