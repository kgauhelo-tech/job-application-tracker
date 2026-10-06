import styles from "./Auth.module.css";
import Text from "../../components/Text";
import { useNavigate } from "react-router";
import { useContext, useRef, useState, type MouseEvent } from "react";
import { UserContext } from "../Auth/UserContext";

const Logout = () => {
  const { logout, isLoggedIn } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  function handleLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggedIn()) {
      if (typeof logout === "function") {
        logout();
      }
      navigate("/login");
    } else {
      setMessage("You are not logged in!");
    }
  }

  function handleCancelLogout(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_elements}>
        <div>
          <Text variant="heading">You are about to log out</Text>
        </div>
        <div className={styles.btn}>
          <div className={styles.btn_cont}>
            <button
              className={styles.cancel_btn}
              onClick={handleCancelLogout}
              type="button"
            >
              <Text variant="p">Cancel</Text>
            </button>
            <button onClick={handleLogout} type="button">
              <Text variant="p">Logout</Text>
            </button>
          </div>
        </div>

        {message && (
          <div
            ref={messageRef}
            className={`${styles.message} ${styles.hidden}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
