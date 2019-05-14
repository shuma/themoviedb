import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import "./styles/App.scss";

import Search from "./components/Search";
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";

const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${
  process.env.REACT_APP_MOVIEDB_API_KEY
}`;

const App = () => (
  <Router history={history}>
    <div className="App">
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
