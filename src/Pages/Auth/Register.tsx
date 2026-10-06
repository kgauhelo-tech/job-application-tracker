import React, { useContext, useState } from "react";
import styles from "./Auth.module.css";
import InputComponent from "../../components/Text-input/Input";
import Text from "../../components/Text";
import { NavLink, useNavigate } from "react-router";
import { UserContext } from "./UserContext";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const success = await register(username, password);

    if (success) {
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setMessage("Username already taken. Please try another.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister} className={styles.input_elements}>
        <div>
          <Text variant="heading">Register</Text>
        </div>

        <div className={styles.input_cont}>
          <InputComponent
            elementId="register-username"
            label="Username"
            inputType="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.input_cont}>
          <InputComponent
            elementId="register-password"
            label="Password"
            inputType="password"
            placeholder="•••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.btn}>
          <button type="submit">
            <Text variant="p">Register</Text>
          </button>
          <Text variant="p">
            Already have an account?{" "}
            <NavLink className={styles.nav_link} to="/login">
              Login
            </NavLink>
          </Text>
        </div>

        {message && <div className={styles.message}>{message}</div>}
      </form>
    </div>
  );
};

export default Register;
