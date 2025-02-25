import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ModeContext } from "../contexts/ModeContext"; // Import the context
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const { darkMode, handleModeChange } = useContext(ModeContext); // Use context directly

  return (
    <nav className={`${styles["navbar"]}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/add-profile">Add Profile</Link>
        </li>
      </ul>
      <button onClick={handleModeChange}>
        {darkMode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
