import axios from "axios";
import { put } from "redux-saga/effects";

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

export default postMovie;
