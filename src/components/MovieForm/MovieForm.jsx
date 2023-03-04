import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function MovieForm() {
  // get genre list from database
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const genres = useSelector((store) => store.genres);

  const [movieToSend, setMovieToSend] = useState({});

  const handleSubmit = () => {
    // movie POST request: structure required is
    // {title, poster, description, genre_id}
    dispatch({ type: "POST_MOVIE", payload: movieToSend });
  };

  const handleInputChange = (event) => {
    setMovieToSend({ ...movieToSend, title: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(event) => {
          setMovieToSend({ ...movieToSend, title: event.target.value });
        }}
        type="text"
        placeholder="Title"
      />
      <input
        onChange={(event) => {
          setMovieToSend({ ...movieToSend, poster: event.target.value });
        }}
        type="text"
        placeholder="Image url"
      />
      <textarea
        onChange={(event) => {
          setMovieToSend({ ...movieToSend, description: event.target.value });
        }}
        placeholder="description"
      />
      <select
        onChange={(event) => {
          setMovieToSend({
            ...movieToSend,
            genre_id: event.target.selectedOptions[0].id,
          });
        }}
      >
        {genres &&
          genres.map((genre) => (
            <option id={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
      </select>
      <button type="submit">SAVE</button>
    </form>
  );
}

export default MovieForm;
