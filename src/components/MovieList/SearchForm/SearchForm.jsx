import { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchForm() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = () => {
    // prevent search if input is empty
    if (searchQuery) {
      history.push(`/${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search"
      ></input>
      <button type="submit">GO</button>
    </form>
  );
}

export default SearchForm;
