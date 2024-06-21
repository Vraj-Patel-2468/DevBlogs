import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    mode: modeSlice.reducer,
    user: userSlice.reducer,
  },
});
