// import React from "react";

// import { NavLink } from "react-router";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav>
      <div className={styles["nav-container"]}>
        <div className={styles.logo}>Track-it</div>
        <div className={styles.links}>
          {/* <NavLink className={styles.link} to="/about">
            About
          </NavLink>
          <NavLink className={styles.link} to="/home">
            Home
          </NavLink>
          <NavLink className={styles.link} to="/logout">
            Logout
          </NavLink>
          <NavLink className={styles.link} to="/register">
            Register
          </NavLink>
          <NavLink className={styles.link} to="/login">
            Login
          </NavLink> */}
          <a className={styles.link} href="">
            About
          </a>
          <a className={styles.link} href="">
            Home
          </a>
          <a className={styles.link} href="">
            Register
          </a>
          <a className={styles.link} href="">
            Logout
          </a>
          <a className={styles["link login"]} href="">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
