import axios from "axios";
import { put } from "redux-saga/effects";

// movie PUT request generator function
function* updateMovie(action) {
  try {
    console.log("in updateMovie, new movie is:", action.payload);
    yield axios.put(`/api/movie/${action.payload.id}`, {
      title: action.payload.title,
      description: action.payload.description,
      genres: action.payload.genres,
    });
    // TODO: CHECK IF NECESSARY
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error in updateMovie:", error);
  }
}

export default updateMovie;
