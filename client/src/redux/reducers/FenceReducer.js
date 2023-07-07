import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fence: { lat: -1, lon: -1 },
};

export const counterSlice = createSlice({
  name: "fence",
  initialState,
  reducers: {
    setFence: (state, action) => {
      state.fence = action.payload;
    },
  },
});

export const { setFence } = counterSlice.actions;

export default counterSlice.reducer;
