import { Link } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";

const Header = ({ user, handleLogout }) => {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={Link} to="/">
          blogs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/users">
          users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {`(Logged in as ${user.name} `}
        <Button className="logout-button" onClick={handleLogout}>
          logout
        </Button>
        {")"}
      </Nav.Item>
    </Nav>
  );
};

export default Header;
