import React, { useState } from 'react';
import "../styles/navbar.css"

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
      <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Profiles</a></li>
      </ul>
      <button onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
