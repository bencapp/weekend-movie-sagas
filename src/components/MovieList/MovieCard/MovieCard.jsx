import { Paper } from "@mui/material";
import { useHistory } from "react-router-dom";

function MovieCard({ movie }) {
  const history = useHistory();

  // styling for Paper MUI component
  const paperSX = {
    boxShadow: 3,
    "&:hover": {
      boxShadow: 12,
    },
    backgroundColor: "#E4DFDA",
    height: "360px",
  };

  return (
    <Paper
      sx={paperSX}
      key={movie.id}
      onClick={() => history.push(`/movie/${movie.id}`)}
    >
      <h3>{movie.title}</h3>
      <img src={movie.poster} alt={movie.title} />
    </Paper>
  );
}

export default MovieCard;
