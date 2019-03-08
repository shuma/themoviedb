import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  cleanup,
  waitForElement,
  queryByTestId
} from "react-testing-library";
import MoviesList from "../components/MoviesList";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

const movies = {
  results: [
    {
      id: "123",
      title: "Enter the dragon",
      poster_path: "movie-poster.jpg"
    },
    {
      id: "1234",
      title: "Enter the dragon",
      poster_path: "movie-poster.jpg"
    },
    {
      id: "12345",
      title: "Enter the dragon",
      poster_path: "movie-poster.jpg"
    }
  ]
};

test("<MovieList />", async () => {
  fetch.mockResponseOnce(JSON.stringify(movies));
  const { debug, getByTestId, queryByTestId, getAllByTestId } = render(
    <MemoryRouter>
      <MoviesList />
    </MemoryRouter>
  );
  expect(getByTestId("loading")).toBeTruthy();
  await waitForElement(() => getByTestId("movie-link"));
  expect(queryByTestId("loading")).toBeFalsy();
  expect(getByTestId("movie-link").getAttribute("href")).toBe(
    `/${movies.results[0].id}`
  );
  expect(getAllByTestId("movie-link").length).toBe(movies.results.length);
});
