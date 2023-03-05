import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  FormControlLabel,
  Checkbox,
  Paper,
  TextField,
  Button,
} from "@mui/material";

import "./EditMovie.css";

// movie prop is the movie to edit
function EditMovie() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const movie = useSelector((store) => store.movieToDisplay);
  const genres = useSelector((store) => store.genres);
  const movieBeingUpdated = useSelector((store) => store.movieBeingUpdated);

  // get individual movie from server based on ID
  // include id as part of dependency array so that page will re-render
  // on id change
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE", payload: id });
    dispatch({ type: "FETCH_GENRES" });
    // dispatch current movie info to movieBeingUpdated
    // dispatch movie with genres represented by their ids
    dispatch({
      type: "SET_MOVIE_BEING_UPDATED",
      payload: {
        ...movie,
        genres: movie.genres.map((movieGenre) => {
          for (let genre of genres) {
            if (genre.name == movieGenre) {
              return genre.id;
            }
          }
        }),
      },
    });
  }, []);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_MOVIE",
      payload: movieBeingUpdated,
    });
    history.push(`/movie/${id}`);
  };

  return (
    <Paper id="edit-movie-container">
      <form id="edit-movie-form" onSubmit={handleSubmit}>
        <b>Edit Movie</b>
        <TextField
          label="Title"
          value={movieBeingUpdated.title}
          onChange={(event) =>
            dispatch({
              type: "SET_MOVIE_BEING_UPDATED",
              payload: { ...movieBeingUpdated, title: event.target.value },
            })
          }
        ></TextField>
        <TextField
          label="Description"
          value={movieBeingUpdated.description}
          onChange={(event) =>
            dispatch({
              type: "SET_MOVIE_BEING_UPDATED",
              payload: {
                ...movieBeingUpdated,
                description: event.target.value,
              },
            })
          }
        ></TextField>
        <b id="genres-header">Genres:</b>
        <div id="checkboxes-container">
          {genres &&
            genres.map((genre) => (
              <FormControlLabel
                key={genre.id}
                control={
                  <Checkbox
                    defaultChecked={movie.genres.includes(genre.name)}
                    onChange={(event) => {
                      console.log("seeing check change, event is", event);
                      // boolean for whether it is checked or not: event.target.checked

                      dispatch({
                        type: "SET_MOVIE_BEING_UPDATED",
                        payload: {
                          ...movieBeingUpdated,
                          // if field is checked, add it to the list. if unchecked, remove from list
                          genres: event.target.checked
                            ? [...movieBeingUpdated.genres, genre.id]
                            : movieBeingUpdated.genres.filter(
                                (movieGenre) => movieGenre != genre.id
                              ),
                        },
                      });
                    }}
                  />
                }
                label={genre.name}
              />
            ))}
        </div>
        <Button type="submit">SAVE CHANGES</Button>
      </form>
    </Paper>
  );
}

export default EditMovie;
