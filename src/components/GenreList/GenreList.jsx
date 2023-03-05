import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function GenreList() {
  const dispatch = useDispatch();

  const genres = useSelector((store) => store.genres);

  //
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  );
}

export default GenreList;
