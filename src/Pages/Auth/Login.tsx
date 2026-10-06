import styles from "./Auth.module.css";
import InputComponent from "../../components/Text-input/Input";
import Text from "../../components/Text";
import { NavLink } from "react-router";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);

  console.log(messageRef.current);

  const handleLogin = async () => {
    const ok = await login(username, password);
    if (ok) {
      setMessage("Logged in");
    } else {
      setMessage("Couldn't log in");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.input_elements}>
          <div>
            <Text variant="heading">Login</Text>
          </div>
          <div className={styles.input_cont}>
            <InputComponent
              elementId={"login-email"}
              label={"Email"}
              inputType={"email"}
              placeholder="example@email.com"
            />
          </div>
          <div className={styles.input_cont}>
            <InputComponent
              elementId={"login-password"}
              label={"Password"}
              inputType={"password"}
              placeholder="•••••••••"
            />
          </div>
          <div className={styles.btn}>
            <button>
              <Text variant="p">Login</Text>
            </button>
            <Text variant="p">
              Don't have an account?{" "}
              <NavLink className={styles.nav_link} to={"/register"}>
                Register
              </NavLink>
            </Text>
          </div>
          <div
            ref={messageRef}
            className={`${styles.message} ${styles.hidden}`}
          >
            {message!}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
