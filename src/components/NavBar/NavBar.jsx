import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import "./NavBar.css";

// NAV element: buttons for site navigation and title
function NavBar() {
  const history = useHistory();

  const movies = useSelector((store) => store.movies);

  const handleRandom = () => {
    // pick a random integer within the length of movies
    const randomInt = Math.floor(Math.random() * movies.length) + 1;
    console.log(randomInt);
    history.push(`/movie/${randomInt}`);
  };

  return (
    <div id="nav-bar">
      <h1 id="title">The Movies Saga!</h1>
      <ButtonGroup>
        <Button onClick={() => history.push("/")}>Home</Button>
        <Button onClick={() => history.push("/addMovie")}>Add Movie</Button>
        <Button onClick={handleRandom}>Random Movie</Button>
      </ButtonGroup>
    </div>
  );
}

export default NavBar;
