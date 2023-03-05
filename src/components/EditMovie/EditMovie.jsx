import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@mui/material";

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
    console.log("in useEffect");
    dispatch({ type: "FETCH_MOVIE", payload: id });
    dispatch({ type: "FETCH_GENRES" });
    // dispatch current movie info to movieBeingUpdated
    console.log("about to set movie being updated, movie is", movie);
    // dispatch movie with genres represented by their ids
    dispatch({
      type: "SET_MOVIE_BEING_UPDATED",
      payload: {
        ...movie,
        genres: movie.genres.map((movieGenre) => {
          for (let genre of genres) {
            if (genre.name == movieGenre) {
              console.log("found match at id", genre.id);
              return genre.id;
            }
          }
        }),
      },
    });
  }, []);

  const handleSubmit = () => {
    console.log("submitting movie, movie is:", movieBeingUpdated);
    dispatch({
      type: "UPDATE_MOVIE",
      payload: movieBeingUpdated,
    });
    history.push(`/movie/${id}`);
  };

  console.log("updating movie, movieBeingUpdated is", movieBeingUpdated);

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={movieBeingUpdated.title}
        onChange={(event) =>
          dispatch({
            type: "SET_MOVIE_BEING_UPDATED",
            payload: { ...movieBeingUpdated, title: event.target.value },
          })
        }
      ></textarea>
      <textarea
        value={movieBeingUpdated.description}
        onChange={(event) =>
          dispatch({
            type: "SET_MOVIE_BEING_UPDATED",
            payload: { ...movieBeingUpdated, description: event.target.value },
          })
        }
      ></textarea>
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
      <button type="submit">SUBMIT CHANGES</button>
    </form>
  );
}

export default EditMovie;
