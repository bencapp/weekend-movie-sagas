import axios from "axios";
import { put } from "redux-saga/effects";

// fetch all genres
function* fetchGenres() {
  try {
    const genres = yield axios.get("/api/genre");
    yield put({ type: "SET_GENRES", payload: genres.data });
  } catch (error) {
    console.log("error in fetchGenres:", error);
  }
}

export default fetchGenres;
