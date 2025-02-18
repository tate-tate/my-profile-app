import React, { useState } from 'react';
import "../styles/navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle("dark-bg");
    document.querySelector(".navbar").classList.toggle("dark-bg");
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar">
      <ul>
      <li><Link to="/">HomePage</Link></li>
        <li><Link to="/about">About </Link></li>
        <li><Link to="/add-profile">Add Profile </Link></li>
      </ul>
      <button onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
