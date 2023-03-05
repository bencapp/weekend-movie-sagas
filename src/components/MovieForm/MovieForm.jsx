import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { TextField, Button, Paper } from "@mui/material";

import "./MovieForm.css";

function MovieForm() {
  // get genre list from database
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const genres = useSelector((store) => store.genres);

  const [movieToSend, setMovieToSend] = useState({});

  const handleSubmit = () => {
    // movie POST request: structure required is
    // {title, poster, description, genre_id}
    dispatch({ type: "POST_MOVIE", payload: movieToSend });
  };

  const handleInputChange = (event) => {
    setMovieToSend({ ...movieToSend, title: event.target.value });
  };

  return (
    <Paper id="add-movie-form-container">
      <form id="add-movie-form" onSubmit={handleSubmit}>
        <b>Add a Movie</b>

        <TextField
          onChange={(event) => {
            setMovieToSend({ ...movieToSend, title: event.target.value });
          }}
          type="text"
          placeholder="Title"
        />
        <TextField
          onChange={(event) => {
            setMovieToSend({ ...movieToSend, poster: event.target.value });
          }}
          type="text"
          placeholder="Image url"
        />
        <TextField
          onChange={(event) => {
            setMovieToSend({ ...movieToSend, description: event.target.value });
          }}
          placeholder="Description"
        />
        <label htmlFor="genre-select">Genre:</label>
        <select
          name="genre-select"
          onChange={(event) => {
            setMovieToSend({
              ...movieToSend,
              genre_id: event.target.selectedOptions[0].id,
            });
          }}
        >
          {genres &&
            genres.map((genre) => (
              <option id={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
        </select>
        <Button type="submit">SAVE</Button>
      </form>
    </Paper>
  );
}

export default MovieForm;
