import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./MovieList.css";
import GenreList from "./GenreList/GenreList";
import MovieCard from "./MovieCard/MovieCard";

function MovieList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector((store) => store.movies);

  const [moviesToDisplay, setMoviesToDisplay] = useState();

  // param for search query
  const { query } = useParams();

  useEffect(() => {
    console.log("in useEffect");
    dispatch({ type: "FETCH_MOVIES" });
    console.log(moviesToDisplay);
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
    } else {
      setMoviesToDisplay(movies);
    }
  }, [query]);

  console.log(moviesToDisplay);
  return (
    <>
      <main>
        <h1>MovieList</h1>
        <section className="movies">
          {moviesToDisplay &&
            moviesToDisplay.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
        </section>
      </main>
      <GenreList />
    </>
  );
}

export default MovieList;
