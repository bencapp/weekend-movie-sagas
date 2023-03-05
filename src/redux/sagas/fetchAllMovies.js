import axios from "axios";
import { put } from "redux-saga/effects";

function* fetchAllMovies() {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch (err) {
    console.log("get all error:", err);
  }
}

export default fetchAllMovies;
