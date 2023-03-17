import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Button } from "react-bootstrap";

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
    <div className="container">
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

export default Login;