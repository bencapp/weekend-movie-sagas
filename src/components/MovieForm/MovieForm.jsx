import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function MovieForm() {
  // get genre list from database
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  const genres = useSelector((store) => store.genres);

  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Image url" />
      <textarea placeholder="description" />
      <select>
        {genres &&
          genres.map((genre) => <option key={genre.id}>{genre.name}</option>)}
      </select>
      <button type="submit">ADD</button>
    </form>
  );
}

export default MovieForm;
