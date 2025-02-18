import '../App.css';
import style from "../styles/card.module.css";
import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Wrapper from '../components/Wrapper';
import ProfileForm from '../components/ProfileForm';

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);  // Initialize as an empty array
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [titles, setTitles] = useState([]);

  // Fetch profiles and set the profiles and count state
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~severg/profile-app/fetch-data-with-filter.php?title=${title}&name=${searchTerm}&page=${page}&limit=10`)
      .then(res => res.json())
      .then(data => {
        setProfiles(data.profiles); // Make sure profiles is always an array
        setCount(data.count);  // Ensure count is a valid number
        setPage(data.page);  // Keep the page number consistent
        console.log(data);
      });
  }, [title, searchTerm, page]);

  // Fetch titles based on the selected title, searchTerm, and page
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~severg/profile-app/get-titles.php`)
      .then((res) => res.json())
      .then((data) => {
        setTitles(data.titles || []); // Ensure titles is always an array
      });
  }, [title, searchTerm, page]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
        <Wrapper>
            <h1>Profile App</h1>
          <div className="filter-wrapper">
            <div className="filter-select">
              <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange}>
                <option value="">All</option>
                {titles.map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
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
          </div>
          <div className={style["profile-cards"]}>
            {profiles.map(profile => (
              <Card key={profile.email} {...profile} />
            ))}
          </div>
          {
            count === 0 && <p>No Profiles found</p>
          }
          {count > 10 &&
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span>{page}/{Math.ceil(count / 10)}</span>
            <button onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(count / 10)}>
              Next
            </button>
          </div>
}
        </Wrapper>
  );
};

export default HomePage;

