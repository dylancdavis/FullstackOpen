import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    likeBlog(state, action) {
      const idToLike = action.payload;
      return state.map((b) => {
        if (b.id === idToLike) {
          return { ...b, likes: b.likes + 1 };
        } else {
          return b;
        }
      });
    },
    deleteBlog(state, action) {
      const idToDelete = action.payload;
      return state.filter((b) => b.id !== idToDelete);
    },
  },
});

export const { setBlogs, addBlog, likeBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
