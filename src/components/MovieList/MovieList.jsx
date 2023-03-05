import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./MovieList.css";
import GenreList from "./GenreList/GenreList";
import SearchForm from "./SearchForm/SearchForm";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  const [moviesToDisplay, setMoviesToDisplay] = useState(movies);

  // param for search query
  const { query } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    // logic for editing movies to display based on search query
    // only begin if there is a search query

    if (query) {
      // movies will appear if either the query appears in either the title
      // or the description
      setMoviesToDisplay(
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query || query.toLowerCase()) ||
            movie.description
              .toLowerCase()
              .includes(query || query.toLowerCase())
        )
      );
    }
  }, []);

  console.log(query);

  return (
    <>
      <SearchForm />
      <main>
        <h1>MovieList</h1>
        <section className="movies">
          {moviesToDisplay.map((movie) => {
            return (
              <div key={movie.id}>
                <h3>{movie.title}</h3>
                <img
                  onClick={() => history.push(`/movie/${movie.id}`)}
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
            );
          })}
        </section>
      </main>
      <GenreList />
    </>
  );
}

export default MovieList;
