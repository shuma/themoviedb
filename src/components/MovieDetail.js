import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

import { Poster } from "./Movie";

const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";

const TMDB_URL = "https://api.themoviedb.org/3/";
const TMDB_APIKEY = "?api_key=690bfb6d5e04eced834c55ceae11e690";

export default class MovieDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    }).isRequired
  };

  state = {
    movie: {},
    cast: []
  };

  componentDidMount() {
    axios
      .all([
        axios.get(
          `${TMDB_URL}movie/${
            this.props.match.params.id
          }${TMDB_APIKEY}&language=en-US`
        ),
        axios.get(
          `${TMDB_URL}movie/${this.props.match.params.id}/credits${TMDB_APIKEY}`
        )
      ])
      .then(
        axios.spread((movie, credit) => {
          this.setState({
            movie: movie.data,
            cast: credit.data.cast
          });
        })
      );
  }

  render() {
    const { movie, cast } = this.state;
    let castList = cast.slice(0, 7).map((cst, idx) => {
      return <CastName key={idx}>{cst.name}, </CastName>;
    });
    return (
      <Fragment>
        <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
          <MovieWrapperShadow />
        </MovieWrapper>
        <MovieInfo>
          <Poster
            src={`${POSTER_PATH}${movie.poster_path}`}
            alt={`${movie.title}-img`}
          />
          <div>
            <h1> {movie.title} </h1>
            <p> {movie.overview} </p>
            <CastHeader>Cast</CastHeader>
            <CastWrapper>{castList} </CastWrapper>
          </div>
        </MovieInfo>
      </Fragment>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background-color: #0e0f0f;
  color: #fff;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const MovieWrapperShadow = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(14, 15, 15, 0) 50%, #0e0f0f);
`;

const CastHeader = styled.p`
  font-weight: bold;
  margin: 0;
`;

const CastWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
`;
const CastName = styled.li`
  margin: 0;
  padding: 0;
  padding-left: 3px;
  list-style: none;
  font-family: SF Sans;
  font-size: 0.857142857rem;
  :nth-child(1) {
    padding: 0;
  }
`;
