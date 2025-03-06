import { useReducer, useEffect, useState } from "react";
import { initialState , homeReducer } from "../reducers/homeReducer";

function useHomepageAPI() {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const {title, searchTerm, page} = state;

  // Fetch titles based on the selected title, searchTerm, and page
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~severg/profile-app/get-titles.php`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_TITLES", payload: data.titles });
      });
  }, []);

    // Fetch profiles and set the profiles and count state
    useEffect(() => {
      fetch(`https://web.ics.purdue.edu/~severg/profile-app/fetch-data-with-filter.php?title=${title}&name=${searchTerm}&page=${page}&limit=10`)
        .then(res => res.json())
        .then(data => {
          dispatch({ type: "FETCH_DATA", payload: data });
          console.log(data);
        });
    }, [title, searchTerm, page]);

    return {dispatch, state};
}
export default useHomepageAPI;