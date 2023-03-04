import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function MovieDetails() {
  // id of movie to display
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  // get individual movie from server based on ID
  // include id as part of dependency array so that page will re-render
  // on id change
  useEffect(() => {
    console.log("changed movie details view");
    dispatch({ type: "FETCH_MOVIE", payload: id });
  }, [id]);

  const movie = useSelector((store) => store.movieToDisplay);
  console.log(movie);
  return (
    <>
      <h1>{movie.title}</h1>
      <img src={movie.poster}></img>
      <p>{movie.description}</p>
      <ul>
        Genres:
        {movie.genres.map((genre) => (
          <li>{genre}</li>
        ))}
      </ul>
      <button onClick={() => history.push("/")}>Back To List</button>
    </>
  );
}

export default MovieDetails;
