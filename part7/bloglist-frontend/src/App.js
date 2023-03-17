import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";

import "./app.css";
import { addBlog, deleteBlog, likeBlog } from "./reducers/blogsReducer";
import { clearUser, setUser } from "./reducers/userReducer";
import userService from "./services/users";

import { Routes, Route, useMatch } from "react-router-dom";
import User from "./components/User";
import BlogPage from "./components/BlogPage";

import Header from "./components/Navbar";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Users from "./components/Users";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((u) => setUsers(u));
  }, []);

  const dispatch = useDispatch();

  const notificationMessage = (message, variant) => {
    dispatch(setNotification({ message, variant }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    dispatch(clearUser());
    notificationMessage("Logged out successfully", "secondary");
  };

  const blogFormRef = useRef();

  const handleBlogCreate = async (title, author, url) => {
    const blogToPost = {
      title: title,
      author: author,
      url: url,
    };
    const createdBlog = await blogService.create(blogToPost);
    dispatch(addBlog(createdBlog));

    notificationMessage(`Added blog "${title}"`, "success");
    blogFormRef.current.toggleVisibility();
  };

  const handleBlogLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    await blogService.update(blog.id, newBlog);
    dispatch(likeBlog(blog.id));
  };

  const handleBlogDelete = async (blog) => {
    if (!window.confirm(`Delete blog ${blog.title}?`)) return;
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog.id));
    notificationMessage(`Deleted blog "${blog.title}"`, "secondary");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem("loggedInUser")
    );
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const userMatch = useMatch("/users/:id");
  const routedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const routedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  return (
    <div className="container">
      <Notification />
      {user ? (
        <div>
          <Header user={user} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <Blogs
                  blogFormRef={blogFormRef}
                  blogs={blogs}
                  handleBlogCreate={handleBlogCreate}
                  handleBlogDelete={handleBlogDelete}
                />
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User user={routedUser} />} />
            <Route
              path="/blogs/:id"
              element={
                <BlogPage blog={routedBlog} handleLike={handleBlogLike} />
              }
            />
          </Routes>
        </div>
      ) : (
        <Login notificationMessage={notificationMessage} />
      )}
    </div>
  );
};

export default App;
