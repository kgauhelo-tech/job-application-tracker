import { useRef, useState } from "react";

import { NavLink } from "react-router";

import styles from "./Navbar.module.css";
import Text from "../components/Text";
import { Menu } from "reicon-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
    isMenuOpen
      ? (menuRef.current!.className = `${styles.hidden_links}`)
      : (menuRef.current!.className = `${styles.hidden_links} ${styles.hidden}`);

    if (isMenuOpen) console.log(isMenuOpen);
    console.log(menuRef.current?.className);
  }

  return (
    <nav>
      <div className={styles["nav-container"]}>
        <div className={styles.logo}>Track-it</div>
        <div className={styles.links}>
          <NavLink className={styles.link} to="/">
            <Text variant={"p"}>About</Text>
          </NavLink>
          <NavLink className={styles.link} to="/home">
            <Text variant={"p"}>Home</Text>
          </NavLink>
          <NavLink className={styles.link} to="/logout">
            <Text variant={"p"}>Logout</Text>
          </NavLink>
          <NavLink className={styles.link} to="/register">
            <Text variant={"p"}>Register</Text>
          </NavLink>
          <NavLink className={`${styles.link} ${styles.login}`} to="/login">
            <Text variant={"p"}>Login</Text>
          </NavLink>
        </div>
        <div className={`${styles.menu}`}>
          <Menu color="white" size={40} onClick={handleClick} />
        </div>
      </div>
      <div ref={menuRef} className={`${styles.hidden_links} ${styles.hidden}`}>
        <NavLink className={styles.link} to="/">
          <Text variant={"p"}>About</Text>
        </NavLink>
        <NavLink className={styles.link} to="/home">
          <Text variant={"p"}>Home</Text>
        </NavLink>
        <NavLink className={styles.link} to="/logout">
          <Text variant={"p"}>Logout</Text>
        </NavLink>
        <NavLink className={styles.link} to="/register">
          <Text variant={"p"}>Register</Text>
        </NavLink>
        <NavLink className={`${styles.link} ${styles.login}`} to="/login">
          <Text variant={"p"}>Login</Text>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
