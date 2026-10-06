import styles from "./Auth.module.css";
import InputComponent from "../../components/Text-input/Input";
import Text from "../../components/Text";
import { NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const LoginPage = () => {
  const { login, isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(`is submitting: ${isSubmitting}`);
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (typeof login === "function") {
        const success = await login(username, password);

        if (success || isLoggedIn()) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Login failed due to a network or server error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.input_elements}>
        <div>
          <Text variant="heading">Login</Text>
        </div>

        <div className={styles.input_cont}>
          <InputComponent
            elementId="login-username"
            label="Username"
            inputType="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className={styles.input_cont}>
          <InputComponent
            elementId="login-password"
            label="Password"
            inputType="password"
            placeholder="•••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <div className={styles.btn}>
          <button type="submit" disabled={isSubmitting}>
            <Text variant="p">{isSubmitting ? "Logging in..." : "Login"}</Text>
          </button>
          <Text variant="p">
            Don't have an account?{" "}
            <NavLink className={styles.nav_link} to="/register">
              Register
            </NavLink>
          </Text>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
