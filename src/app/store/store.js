import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/auth/authSlice";
import postSlice from "../redux/post/postSlice";
import postsSlice from "../redux/posts/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postsSlice,
    post: postSlice,
  },
});
