import { useContext } from "react";
import { UserContext } from "../Pages/Auth/UserContext";
import styles from "./Notification.module.css"; // Adjust filename/path if needed

const Notification = () => {
  const { message, clearMessage } = useContext(UserContext);

  if (!message) return null;

  return (
    <div className={styles.toast}>
      <span>{message}</span>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={clearMessage}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
