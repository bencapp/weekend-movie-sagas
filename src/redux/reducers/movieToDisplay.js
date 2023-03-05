// store the individual movie to display
const movieToDisplay = (state = {}, action) => {
  switch (action.type) {
    case "SET_CURRENT_MOVIE":
      return action.payload;
    default:
      return state;
  }
};

export default movieToDisplay;
