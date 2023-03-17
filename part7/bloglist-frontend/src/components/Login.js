import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

const Login = ({ notificationMessage }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      notificationMessage(`logged in as ${user.name}`, "success");
    } catch (e) {
      console.log(e.name, e.message);
      notificationMessage("Incorrect username or password", "danger");
    }
  };

  return (
    <div className="login">
      <h1>login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="input-username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="input-password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button className="submit-button mt-3" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
