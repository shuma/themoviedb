import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import Movie from "./Movie";

const Header = styled.h4`
  color: #fff;
  margin-left: 1em;
  margin-bottom: 0;
  margin-top: 1.5em;
`;

export default class MoviesList extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=690bfb6d5e04eced834c55ceae11e690&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      );
      const movies = await res.json();
      this.setState({
        movies: movies.results
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <>
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
      </>
    );
  }
}

