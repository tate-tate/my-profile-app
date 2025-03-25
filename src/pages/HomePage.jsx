import '../App.css';
import style from "../styles/card.module.css";
import React, { useCallback } from 'react';
import Wrapper from '../components/Wrapper';
import Card from "../components/Card";
import { Link } from 'react-router-dom';
import useHomepageAPI from '../hooks/homepageAPI';

const HomePage = () => {
  const { dispatch, state } = useHomepageAPI();
  const { profiles, page, count, title, searchTerm, titles } = state;

  const handleTitleChange = useCallback((event) => {
    dispatch({ type: "SET_TITLE", payload: event.target.value });
  }, [dispatch]);

  const handleSearchChange = useCallback((event) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
  }, [dispatch]);

  const handlePageChange = useCallback((newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR_FILTERS" });
  }, [dispatch]);

  return (
    <Wrapper>
      <h1>Profile App</h1>
      <FilterSection
        titles={titles}
        title={title}
        searchTerm={searchTerm}
        onTitleChange={handleTitleChange}
        onSearchChange={handleSearchChange}
        onClearFilters={clearFilters}
      />
      <ProfileCards profiles={profiles} />
      <Pagination
        count={count}
        page={page}
        onPageChange={handlePageChange}
      />
    </Wrapper>
  );
};

const FilterSection = React.memo(({ titles, title, searchTerm, onTitleChange, onSearchChange, onClearFilters }) => (
  <div className="filter-wrapper">
    <div className="filter-select">
      <label htmlFor="title-select">Select a title: </label>
      <select id="title-select" value={title} onChange={onTitleChange}>
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
        onChange={onSearchChange}
        placeholder="Search by name"
      />
    </div>

    <button onClick={onClearFilters}>Clear Filters</button>
  </div>
));

const ProfileCards = React.memo(({ profiles }) => (
  <div className={style["profile-cards"]}>
    {profiles.length > 0 ? (
      profiles.map(profile => (
        <Link to={`/profile/${profile.id}`} key={profile.id}>
          <Card key={profile.email} {...profile} />
        </Link>
      ))
    ) : (
      <p>No Profiles found</p>
    )}
  </div>
));

const Pagination = React.memo(({ count, page, onPageChange }) => {
  if (count <= 10) return null;

  const totalPages = Math.ceil(count / 10);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>{page}/{totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
});

export default HomePage;