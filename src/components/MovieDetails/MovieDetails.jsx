import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MovieDetails() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();

  // get individual movie from server based on ID
  dispatchEvent();

  list;
  const movies = useSelector((store) => store.movies);
  console.log(movies);
  console.log(id);
  return <h1>Details</h1>;
}

export default MovieDetails;
