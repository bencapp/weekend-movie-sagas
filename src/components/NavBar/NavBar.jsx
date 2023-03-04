import { useHistory } from "react-router-dom";

// NAV element: buttons for site navigation and title
function NavBar() {
  let history = useHistory();

  return (
    <div>
      <h1>The Movies Saga!</h1>
      <button onClick={() => history.push("/")}>Home</button>
      <button onClick={() => history.push("/addMovie")}>Add Movie</button>
    </div>
  );
}

export default NavBar;
