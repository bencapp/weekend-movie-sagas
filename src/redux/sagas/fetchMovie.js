import axios from "axios";
import { put } from "redux-saga/effects";

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

export default fetchMovie;
