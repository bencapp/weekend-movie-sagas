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
import { takeEvery } from "redux-saga/effects";
import movies from "./redux/reducers/movies";
import movieToDisplay from "./redux/reducers/movieToDisplay";
import genres from "./redux/reducers/genres";
import movieBeingUpdated from "./redux/reducers/movieBeingUpdated";
import fetchAllMovies from "./redux/sagas/fetchAllMovies";
import fetchMovie from "./redux/sagas/fetchMovie";
import fetchGenres from "./redux/sagas/fetchGenres";
import postMovie from "./redux/sagas/postMovie";
import deleteMovie from "./redux/sagas/deleteMovie";
import updateMovie from "./redux/sagas/updateMovie";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_MOVIE", fetchMovie);
  yield takeEvery("FETCH_GENRES", fetchGenres);
  yield takeEvery("POST_MOVIE", postMovie);
  yield takeEvery("DELETE_MOVIE", deleteMovie);
  yield takeEvery("UPDATE_MOVIE", updateMovie);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    movieToDisplay,
    genres,
    movieBeingUpdated,
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
