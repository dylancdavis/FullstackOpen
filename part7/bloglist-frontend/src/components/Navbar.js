import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";

const Navbar = ({ user, handleLogout }) => {
  return (
    <Nav className="mb-3">
      <Nav.Item className="h1">
        <Nav.Link as={Link} to="/">
          blogs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="h1">
        <Nav.Link as={Link} to="/users">
          users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="h3 login-info">
        <span className="login-text">{`Logged in as ${user.name}`}</span>
        <Button className="logout-button" onClick={handleLogout}>
          logout
        </Button>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
