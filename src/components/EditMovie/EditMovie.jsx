import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@mui/material";

// movie prop is the movie to edit
function EditMovie() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [movieTitle, setMovieTitle] = useState();
  const [movieDescription, setMovieDescription] = useState();
  const [movieGenres, setMovieGenres] = useState();

  const movie = useSelector((store) => store.movieToDisplay);
  const genres = useSelector((store) => store.genres);

  // get individual movie from server based on ID
  // include id as part of dependency array so that page will re-render
  // on id change
  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_MOVIE", payload: id });
    dispatch({ type: "FETCH_GENRES" });
    setMovieTitle(movie.title);
    setMovieDescription(movie.description);
    console.log("about to set movie genres, movie is:", movie);
    // TODO: enable set movie genres on reload
    setMovieGenres(movie.genres);
  }, [id]);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_MOVIE",
      payload: {
        id: id,
        title: movieTitle,
        description: movieDescription,
        genres: movieGenres,
      },
    });
    history.push(`/movie/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        defaultValue={movie.title}
        value={movieTitle}
        onChange={(event) => setMovieTitle(event.target.value)}
      ></textarea>
      <textarea
        defaultValue={movie.description}
        value={movieDescription}
        onChange={(event) => setMovieDescription(event.target.value)}
      ></textarea>
      {genres &&
        genres.map((genre) => (
          <FormControlLabel
            key={genre.id}
            control={
              <Checkbox
                defaultChecked={movie.genres.includes(genre.name)}
                onChange={(event) => {
                  console.log(
                    "changing genres, event.target is",
                    event.target,
                    "genre is:",
                    genre,
                    "movieGenres is:",
                    movieGenres
                  );
                  movieGenres &&
                    setMovieGenres(
                      event.target.checked
                        ? [...movieGenres, genre.name]
                        : movieGenres //.filter((genre) => genre != genre.name)
                    );
                }}
              />
            }
            label={genre.name}
          />
        ))}
      {JSON.stringify(movieGenres)}
      <button type="submit">SUBMIT CHANGES</button>
    </form>
  );
}

export default EditMovie;
