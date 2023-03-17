import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    notification && <Alert className="notification-box">{notification}</Alert>
  );
};

export default Notification;
