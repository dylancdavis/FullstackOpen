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
    commentOn(state, action) {
      const idToComment = action.payload.id;
      const commentToAdd = action.payload.comment;

      return state.map((b) => {
        return b.id === idToComment
          ? { ...b, comments: [...b.comments, commentToAdd] }
          : b;
      });
    },
  },
});

export const { setBlogs, addBlog, likeBlog, deleteBlog, commentOn } =
  blogSlice.actions;
export default blogSlice.reducer;
