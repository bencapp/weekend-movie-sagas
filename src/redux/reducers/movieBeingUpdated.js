// Used to store the movie genres
const movieBeingUpdated = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOVIE_BEING_UPDATED":
      return action.payload;
    default:
      return state;
  }
};

export default movieBeingUpdated;
