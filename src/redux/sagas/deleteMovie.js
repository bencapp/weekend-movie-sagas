import axios from "axios";
import { put } from "redux-saga/effects";

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

export default deleteMovie;
