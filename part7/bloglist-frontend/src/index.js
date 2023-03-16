import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer, { setBlogs } from "./reducers/blogsReducer";
import blogService from "./services/blogs";
import userReducer from "./reducers/userReducer";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

blogService.getAll().then((b) => store.dispatch(setBlogs(b)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
