import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ModeContext } from "../contexts/ModeContext"; // Import the context
import styles from "../styles/navbar.module.css";
import { AuthContext }  from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { darkMode, handleModeChange } = useContext(ModeContext);
  const { isLogin, logout } = useContext(AuthContext);

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
        {isLogin ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      <button onClick={handleModeChange}>
        {darkMode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
