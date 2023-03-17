import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = ({ user, handleLogout }) => {
  return (
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
  );
};

export default Header;
