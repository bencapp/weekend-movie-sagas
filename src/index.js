import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import movies from "./redux/reducers/movies";
import movieToDisplay from "./redux/reducers/movieToDisplay";
import genres from "./redux/reducers/genres";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_MOVIE", fetchMovie);
  yield takeEvery("FETCH_GENRES", fetchGenres);
  yield takeEvery("POST_MOVIE", postMovie);
  yield takeEvery("DELETE_MOVIE", deleteMovie);
  yield takeEvery("UPDATE_MOVIE", updateMovie);
}

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
}

// fetch an individual movie based on id
// action.payload is the movie's id
function* fetchMovie(action) {
  try {
    const movie = yield axios.get(`/api/movie/${action.payload}`);
    yield put({ type: "SET_CURRENT_MOVIE", payload: movie.data });
  } catch (error) {
    console.log("error in fetchMovie:", error);
  }
}

// fetch all genres
function* fetchGenres() {
  try {
    const genres = yield axios.get("/api/genre");
    yield put({ type: "SET_GENRES", payload: genres.data });
  } catch (error) {
    console.log("error in fetchGenres:", error);
  }
}

// movie POST request: structure required is
// {title, poster, description, genre_id}
function* postMovie(action) {
  try {
    console.log("in postMovie, sending:", action.payload);
    yield axios.post("/api/movie", action.payload);
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error in postMovie:", error);
  }
}

// movie DELETE request: action.payload is the movie id
function* deleteMovie(action) {
  try {
    console.log("in deleteMovie, deleting at id:", action.payload);
    yield axios.delete(`/api/movie/${action.payload}`);
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error in deleteMovie:", error);
  }
}

// movie PUT request generator function
function* updateMovie(action) {
  try {
    console.log("in updateMovie, updating at id:", action.payload.id);
    yield axios.put(`/api/movie/${action.payload.id}`, {
      title: action.payload.title,
      description: action.payload.description,
    });
    // TODO: CHECK IF NECESSARY
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error in updateMovie:", error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    movieToDisplay,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
