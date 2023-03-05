import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Paper, Button, ButtonGroup } from "@mui/material";
import "./MovieDetails.css";

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
    <Paper className="details-container">
      <div id="details-image">
        <h1>{movie.title}</h1>
        <img src={movie.poster}></img>
      </div>
      <p id="details-description">{movie.description}</p>
      <div id="details-genres">
        <b>Genres:</b>
        <div id="details-genre-list">
          {movie.genres &&
            movie.genres.map((genre, i, row) => {
              return (
                <>
                  <div className="genre-item" key={i}>
                    {genre}
                  </div>
                  {i + 1 != row.length && <div className="genre-item">|</div>}
                </>
              );
            })}
        </div>
      </div>
      <ButtonGroup id="details-buttons">
        <Button onClick={() => history.push("/")}>Back To List</Button>
        <Button onClick={() => history.push(`/edit/${id}`)}>EDIT MOVIE</Button>
        <Button color="warning" onClick={handleDelete}>
          DELETE MOVIE
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

export default MovieDetails;
