import { configureStore } from "@reduxjs/toolkit";
import FenceReducer from "./reducers/FenceReducer";

export const store = configureStore({
  reducer: {
    FenceReducer,
  },
});
