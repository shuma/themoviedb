import React, { useState } from "react";
import Downshift from "downshift";
import axios from "axios";
import history from "../history";

const Search = () => {
  const [movies, setMovies] = useState([]);

  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
    fetchMovies(event.target.value);
  };

  // input field for the <Downshift /> component
  const downshiftOnChange = selectedMovie => {
    history.push(`/${selectedMovie.id}`);
  };

  // method to fetch the movies from the movies API
  const fetchMovies = movie => {
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&query=${movie}`;
    axios.get(moviesURL).then(response => {
      setMovies(response.data.results);
    });
  };
  return (
    <Downshift
      onChange={downshiftOnChange}
      itemToString={item => (item ? item.title : "")}
    >
      {({
        selectedItem,
        getInputProps,
        getItemProps,
        highlightedIndex,
        isOpen,
        inputValue
      }) => (
        <div>
          <br />
          <input
            {...getInputProps({
              placeholder: "Search movies",
              onChange: inputOnChange
            })}
          />
          {isOpen ? (
            <div className="downshift-dropdown">
              {movies
                .filter(
                  item =>
                    !inputValue ||
                    item.title.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 10)
                .map((item, index) => (
                  <div
                    className="dropdown-item"
                    {...getItemProps({ key: index, index, item })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
export default Search;
