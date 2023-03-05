import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./SearchForm.css";

function SearchForm() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = () => {
    // prevent search if input is empty
    if (searchQuery) {
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <TextField
        color="dark"
        size="small"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        label="Search for a Movie"
      ></TextField>
      <Button type="submit">GO</Button>
    </form>
  );
}

export default SearchForm;
