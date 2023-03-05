import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.css";
import GenreList from "./GenreList/GenreList";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <>
      <main>
        <h1>MovieList</h1>
        <section className="movies">
          {movies.map((movie) => {
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
