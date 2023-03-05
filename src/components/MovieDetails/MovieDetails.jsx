import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Paper } from "@mui/material";

function MovieDetails() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  // get individual movie from server based on ID
  // include id as part of dependency array so that page will re-render
  // on id change
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE", payload: id });
  }, [id]);

  const movie = useSelector((store) => store.movieToDisplay);

  const handleDelete = () => {
    // dispatch to SAGA
    dispatch({ type: "DELETE_MOVIE", payload: id });
    // go back to the main page
    history.push("/");
  };
  return (
    <Paper>
      <h1>{movie.title}</h1>
      <img src={movie.poster}></img>
      <p>{movie.description}</p>
      <ul>
        Genres:
        {movie.genres &&
          movie.genres.map((genre, i) => <li key={i}>{genre}</li>)}
      </ul>
      <button onClick={() => history.push("/")}>Back To List</button>
      <button onClick={() => history.push(`/edit/${id}`)}>EDIT MOVIE</button>
      <button onClick={handleDelete}>DELETE MOVIE</button>
    </Paper>
  );
}

export default MovieDetails;
