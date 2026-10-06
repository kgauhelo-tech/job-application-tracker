import React from "react";
import styles from "./Auth.module.css";
import InputComponent from "../../components/Text-input/Input";
import Text from "../../components/Text";
import { NavLink } from "react-router";

const Register = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.input_elements}>
          <div>
            <Text variant="heading">Register</Text>
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
              <Text variant="p">Register</Text>
            </button>
            <Text variant="p">
              Already have an account? {""}
              <NavLink className={styles.nav_link} to={"/login"}>
                Login
              </NavLink>
            </Text>
          </div>
          <div className={`${styles.message} ${styles.hidden}`}></div>
        </div>
      </div>
    </>
  );
};

export default Register;
