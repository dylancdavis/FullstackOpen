import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";

import "./app.css";
import { addBlog, deleteBlog, likeBlog } from "./reducers/blogsReducer";
import { clearUser, setUser } from "./reducers/userReducer";
import userService from "./services/users";

import { Routes, Route, Link, useMatch } from "react-router-dom";
import User from "./components/User";
import BlogPage from "./components/BlogPage";

import { Button } from "react-bootstrap";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((u) => setUsers(u));
  }, []);

  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const notificationMessage = (message) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      `Login submitted, username: ${username}, password: ${password}`
    );

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      console.log("Login successful, with user", user);
      notificationMessage(`logged in as ${user.name}`);
    } catch (e) {
      console.log(e.name, e.message);
      notificationMessage("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    blogService.setToken(null);
    dispatch(clearUser());
    notificationMessage("Logged out successfully");
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

    notificationMessage("Created new blog");
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

  return user ? (
    // Blogs Area
    <div className="container">
      {notification && <p className="notification-box">{notification}</p>}
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <div>
          {`(Logged in as ${user.name} `}
          <Button className="logout-button" onClick={handleLogout}>
            logout
          </Button>
          {")"}
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>BLOGS</h2>
              <Togglable
                showText={"Add Blog"}
                hideText={"Cancel"}
                ref={blogFormRef}
              >
                <NewBlogForm handleOnSubmit={handleBlogCreate} />
              </Togglable>
              <ul>
                {blogs
                  .slice()
                  .sort((b1, b2) => b2.likes - b1.likes)
                  .map((b) => (
                    <Blog
                      key={b.id}
                      blog={b}
                      handleBlogLike={handleBlogLike}
                      handleBlogDelete={handleBlogDelete}
                    />
                  ))}
              </ul>
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div className="users">
              <h2>USERS</h2>
              <ul>
                {users.map((u) => {
                  console.log(u);

                  return (
                    <li key={u.id}>
                      <Link to={`/users/${u.id}`}>{u.name}</Link>:{" "}
                      {u.blogs.length} {u.blogs.length === 1 ? "blog" : "blogs"}
                    </li>
                  );
                })}
              </ul>
            </div>
          }
        />
        <Route path="/users/:id" element={<User user={routedUser} />} />
        <Route
          path="/blogs/:id"
          element={<BlogPage blog={routedBlog} handleLike={handleBlogLike} />}
        />
      </Routes>
    </div>
  ) : (
    // Login Form
    <div>
      {notification && <p className="notification-box">{notification}</p>}
      <h1>login</h1>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            className="input-username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <br></br>
        <label>
          password
          <input
            className="input-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br></br>
        <Button className="submit-button" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default App;
