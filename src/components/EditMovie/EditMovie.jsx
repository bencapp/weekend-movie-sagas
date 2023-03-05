import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

// movie prop is the movie to edit
function EditMovie() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [movieTitle, setMovieTitle] = useState();
  const [movieDescription, setMovieDescription] = useState();

  const movie = useSelector((store) => store.movieToDisplay);

  // get individual movie from server based on ID
  // include id as part of dependency array so that page will re-render
  // on id change
  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_MOVIE", payload: id });
    setMovieTitle(movie.title);
    setMovieDescription(movie.description);
  }, [id]);

  console.log("displaying movie:", movie);

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_MOVIE",
      payload: { id: id, title: movieTitle, description: movieDescription },
    });
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
      <button type="submit">SUBMIT CHANGES</button>
    </form>
  );
}

export default EditMovie;
