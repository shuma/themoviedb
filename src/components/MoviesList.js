import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import Movie from "./Movie";

const MoviesList = () => {
  const [movies, setMovies] = useState([""]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_MOVIEDB_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      );
      setMovies(res.data.results);
    };
    fetchMovies();
  }, []);

  return (
    <Fragment>
      <Container>
        <Header>Popular Movies</Header>
        <Row style={{ padding: "1rem" }}>
          {movies.map(movie => (
            <Col key={`col-${movie.id}`} lg="2" sm style={{ margin: "10px" }}>
              <Movie key={movie.id} movie={movie} />
            </Col>
          ))}
        </Row>
      </Container>
    </Fragment>
  );
};

export default MoviesList;

const Header = styled.h4`
  color: #fff;
  margin-left: 1em;
  margin-bottom: 0;
  margin-top: 1.5em;
`;
