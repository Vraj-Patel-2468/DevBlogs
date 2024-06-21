import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: "light",
  reducers: {
    toggleMode: (state) => state = "light" ? "dark" : "light",
  },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
