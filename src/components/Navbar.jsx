import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../redux/slices/modeSlice";
import { logout } from "../redux/slices/authSlice";
import Chatbot from "./Chatbot";

const Navbar = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { mode } = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  const handleModeChange = () => {
    dispatch(toggle());
  };

  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChatbotClick = () => {
    setChatbotVisible((prev) => !prev);
  };

  return (
    <>
      <nav className={`${styles["navbar"]}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLogin && (
            <li>
              <Link to="/add-profile">Add Profile</Link>
            </li>
          )}
        </ul>
        {isLogin ? (
          <button onClick={handleClick}>Logout</button>
        ) : (
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
        <button onClick={handleModeChange}>
          {mode === "light" ? "Light Mode" : "Dark Mode"}
        </button>
        <button onClick={handleChatbotClick} className={styles["chatbot-button"]}>
          Chatbot
        </button>
      </nav>
      <Chatbot isVisible={isChatbotVisible} onClose={() => setChatbotVisible(false)} />
    </>
  );
};

export default Navbar;