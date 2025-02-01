import './App.css';
import style from "./styles/card.module.css";
import React, { useState, useEffect } from 'react';
import About from "./components/About";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Wrapper from './components/Wrapper';
import seniorphoto from './assets/senior-photo.jpg';
import manson from "./assets/manson.jpg";

const App = () => {
  // Manage Dark Mode Globally
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const profiles = [
    { email: 'severg@purdue.edu', name: 'Tate Sever', title: 'Student', img: seniorphoto },
    { email: 'manson@manson.net', name: 'Manson', title: 'Cat', img: manson },
    { email: 'manson1@manson.net', name: 'Manson', title: 'Cat', img: manson },
    { email: 'manson2@manson.net', name: 'Manson', title: 'Cat', img: manson }
  ];

  const titles = [...new Set(profiles.map(profile => profile.title))];
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [animation, setAnimation] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setAnimation(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setAnimation(true);
  };

  const filteredProfiles = profiles.filter(profile => 
    (title === "" || profile.title === title) &&
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearFilters = () => {
    setTitle("");
    setSearchTerm("");
    setAnimation(true);
  };

  return (
    <>
      <header>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      </header>
      <main>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <div className="filter-wrapper">
            <div className="filter-select">
              <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange}>
                <option value="">All</option>
                {titles.map((title, index) => (
                  <option key={index} value={title}>{title}</option>
                ))}
              </select>
            </div>

            <div className="filter-search">
              <label htmlFor="search-name">Search by name: </label>
              <input 
                type="text" 
                id="search-name" 
                value={searchTerm} 
                onChange={handleSearchChange}
                placeholder="Search by name"
              />
            </div>
            <div className="clear-filters">
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>
          <div className={style['profile-cards']}>
            {filteredProfiles.map(profile => (
              <Card key={profile.email} {...profile} animate={animation} updateAnimate={() => setAnimation(false)} />
            ))}
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default App;
