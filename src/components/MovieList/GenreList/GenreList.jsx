import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Paper } from "@mui/material";

import "./GenreList.css";

function GenreList() {
  const dispatch = useDispatch();

  const genres = useSelector((store) => store.genres);

  // on load, request genre list
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <Paper id="genre-list-container">
      <b>Genres:</b>
      {genres.map((genre, i, row) => {
        return (
          <>
            <div className="genre-list-item" key={genre.id}>
              {genre.name}
            </div>
            {i + 1 != row.length && <div className="genre-list-item">|</div>}
          </>
        );
      })}
    </Paper>
  );
}

export default GenreList;
