import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import PropTypes from "prop-types";
import styled from "styled-components";

export const POSTER_PATH = "http://image.tmdb.org/t/p/w154";

const Movie = ({ movie }) => {
  if (!movie) return null;
  return (
    <Link to={`/${movie.id}`} data-testid="movie-link">
      <Poster
        src={`${POSTER_PATH}${movie.poster_path}`}
        alt={`${movie.title}-img`}
        effect="blur"
        data-testid="movie-img"
      />
      <MovieTitel>{movie.title}</MovieTitel>
    </Link>
  );
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export const Poster = styled(LazyLoadImage)`
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.5);
  outline: 0.0625rem solid hsla(0, 0%, 100%, 0.05);
  border-radius: 3px;
  background: linear-gradient(180deg, rgba(14, 15, 15, 0) 50%, #0e0f0f);
  max-height: 231px;
`;

const MovieTitel = styled.p`
  color: #fff;
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
  margin-top: 0.8rem;
`;
