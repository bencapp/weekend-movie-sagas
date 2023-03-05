import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import MovieDetails from "../MovieDetails/MovieDetails";
import NavBar from "../NavBar/NavBar";
import MovieForm from "../MovieForm/MovieForm";
import EditMovie from "../EditMovie/EditMovie";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Route path="/" exact>
          <MovieList />
        </Route>

        <Route path="/search/:query" exact>
          <MovieList />
        </Route>

        {/* Add Movie page */}
        <Route path="/addMovie" exact>
          <MovieForm />
        </Route>

        {/* Route for each movie details page, passing id as a parameter */}
        <Route path="/movie/:id" exact>
          <MovieDetails />
        </Route>

        {/* Route for each movie edit page, passing id as a parameter */}
        <Route path="/edit/:id" exact>
          <EditMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
