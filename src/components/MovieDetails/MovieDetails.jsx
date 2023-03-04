import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MovieDetails() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();

  // get individual movie from server based on ID
  dispatch({ type: "FETCH_MOVIE", payload: id });

  const movie = useSelector((store) => store.movieToDisplay);
  console.log(movie);
  return <h1>Details</h1>;
}

export default MovieDetails;
