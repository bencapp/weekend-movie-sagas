const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const format = require("pg-format");

router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

// GET endpoint for individual movie
// also include genres
router.get("/:id", (req, res) => {
  const queryText = `SELECT movies.id, title, poster, description, name FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1`;

  const queryParams = [req.params.id];

  pool
    .query(queryText, queryParams)
    .then((result) => {
      // create array of genres
      const movieGenreList = result.rows.map((element) => element.name);
      // add it as a property to the object being sent
      result.rows[0].genres = movieGenreList;
      // remove the name property
      delete result.rows[0].name;
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("Failed to execute SQL query", queryText, " : ", err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// DELETE endpoint, payload is the movie id
router.delete("/:id", (req, res) => {
  const queryText = `DELETE FROM movies_genres WHERE movie_id = $1`;
  const queryParams = [req.params.id];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // complete another delete query within the first
      const movieDeleteQuery = `DELETE FROM movies WHERE id = $1`;

      pool
        .query(movieDeleteQuery, queryParams)
        .then((result) => res.sendStatus(204))
        .catch((err) => {
          console.log(
            "Failed to execute SQL query",
            movieDeleteQuery,
            " : ",
            err
          );
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Failed to execute SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// PUT endpoint for updating title and description
router.put("/:id", (req, res) => {
  console.log(
    "receiving PUT, req.body is",
    req.body,
    "req.params is:",
    req.params
  );
  const queryText = `UPDATE "movies" SET "title" = $1, "description" = $2
                      WHERE "id" = $3`;
  const queryParams = [req.body.title, req.body.description, req.params.id];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // once first PUT is complete, make a PUT request to the movies_genres table
      // first delete rows of previous relationships, then add rows denoting new ones
      const genreDeleteText = `DELETE FROM movies_genres WHERE movie_id = $1`;
      const genreDeleteParams = [req.params.id];
      pool
        .query(genreDeleteText, genreDeleteParams)
        .then(() => {
          // now add rows back based on params
          let values = [];
          for (let genreID of req.body.genres) {
            values.push([req.params.id, genreID]);
          }
          const genreInsertText = format(
            `INSERT INTO movies_genres (movie_id, genre_id)
                                          VALUES %L`,
            values
          );

          pool
            .query(genreInsertText)
            .then(() => {
              res.sendStatus(204);
            })
            .catch((err) => {
              console.log("Failed to execute SQL query", queryText, " : ", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("Failed to execute SQL query", queryText, " : ", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Failed to execute SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
