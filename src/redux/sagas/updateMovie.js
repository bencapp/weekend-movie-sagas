import axios from "axios";
import { put } from "redux-saga/effects";

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

export default updateMovie;
