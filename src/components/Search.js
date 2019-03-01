import React, { Component, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";

const Suggestions = ({ results, handleSuggestionClick }) => {
  const options = results.map(r => (
    <div key={r.id}>
      <a key={r.id} onClick={handleSuggestionClick} href={`/${r.id}`}>
        {r.title}
      </a>
    </div>
  ));
  return <AutocompleteItems>{options}</AutocompleteItems>;
};

class Search extends Component {
  state = {
    query: "",
    results: [],
    showSuggestions: false
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            axios
              .get(
                `https://api.themoviedb.org/3/search/movie?api_key=690bfb6d5e04eced834c55ceae11e690&language=en-US&query=${
                  this.state.query
                }&page=1&include_adult=false`
              )
              .then(({ data }) => {
                this.setState({
                  results: data.results,
                  showSuggestions: !this.state.showSuggestions
                });
              });
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  handleSuggestionClick = e => {
    this.setState({ showSuggestions: false });
  };

  render() {
    return (
      <Fragment>
        <input
          placeholder="Search for a movie..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
          className="form-control mr-sm-2"
        />

        {this.state.showSuggestions && (
          <Suggestions
            results={this.state.results}
            handleSuggestionClick={this.handleSuggestionClick}
          />
        )}
      </Fragment>
    );
  }
}
export default Search;

const AutocompleteItems = styled.div`
  position: absolute;
  border: 1px solid #242424;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
  > div {
    padding: 10px;
    cursor: pointer;
    background: #242424;
    &:hover {
      /*when hovering an item:*/
      text-decoration: none;
      background-color: #353b42;
    }
  }
  a {
    color: #fff;
    vertical-align: top;
    width: 100%;
    line-height: 2.5rem;
    font-size: 1rem;
    display: block;
    &:hover {
      color: #fff;
    }
  }
`;
