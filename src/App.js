import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

import Search from "./components/Search";

import "./styles/App.scss";

import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";

const App = () => (
  <Router>
    <div className="App">
      <header>
        <Navbar className="bg-red" expand="md">
          <NavbarBrand href="/">themovieDB</NavbarBrand>
          <Nav>
            <NavItem>
              <Search />
            </NavItem>
          </Nav>
        </Navbar>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
