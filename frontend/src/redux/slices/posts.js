import { createSlices } from "@reduxjs/toolkit";

export const postsSlice = createSlices({
  name: "posts",
  initialState: null,
  reducers: {
    setPosts: (state, action) => state = action.payload,
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;