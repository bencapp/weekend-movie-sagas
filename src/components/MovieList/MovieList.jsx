import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./MovieList.css";
import GenreList from "./GenreList/GenreList";
import MovieCard from "./MovieCard/MovieCard";

function MovieList() {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  // param for search query
  const { query } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, [query]);

  return (
    <>
      <main>
        <h1>Movie List</h1>
        <section className="movies">
          {query
            ? movies
                .filter(
                  (movie) =>
                    movie.title.toLowerCase().includes(query.toLowerCase()) ||
                    movie.description
                      .toLowerCase()
                      .includes(query.toLowerCase())
                )
                .map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} />;
                })
            : movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
        </section>
      </main>
      <GenreList />
    </>
  );
}

export default MovieList;
