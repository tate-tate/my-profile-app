import './App.css';
import React, { useState } from 'react';
import About from "./components/About";
import Navbar from "./components/Navbar";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import Card from "./components/Card";
import seniorphoto from './assets/senior-photo.jpg';
import manson from "./assets/manson.jpg";
import PropTypes from 'prop-types';
import Wrapper from './components/Wrapper';

const App = () => {

  const profiles = [
    {email: 'severg@purdue.edu', name: 'Tate Sever', title: 'Student', img: seniorphoto},
    {email: 'manson@manson.net', name: 'Manson', title: 'Cat', img: manson},
    {email: 'manson1@manson.net', name: 'Manson', title: 'Cat', img: manson},
    {email: 'manson2@manson.net', name: 'Manson', title: 'Cat', img: manson}
  ];

  const titles = [...new Set(profiles.map(profile => profile.title))];
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Update the title function
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter profiles based on title and search term
  const filteredProfiles = profiles.filter((profile) => 
    (title === "" || profile.title === title) && 
    (profile.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const clearFilters = () => {
    setTitle("");  // Reset title filter
    setSearchTerm("");  // Reset search term filter
  };

  return (
    <>
        <header>
          <Navbar />
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
            <div className="profile-cards">
              {filteredProfiles.map(profile => (
                <Card key={profile.email} {...profile} />
              ))}
            </div>

          </Wrapper>
        </main>
    </>
  );
}

export default App;
