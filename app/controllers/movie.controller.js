const connection = require("../utils/mysql.util");

const getMovies = async (req, res) => {
  connection.query("SELECT * FROM Movies", (error, results) => {
    if (error) {
      console.log("Error getting movies:", error);
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Movies WHERE movie_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(`Error getting movie with ID ${id}:`, error);
        res.status(500).send(error);
      } else if (results.length === 0) {
        res.status(404).send("Movie not found");
      } else {
        res.send(results[0]);
      }
    }
  );
};

module.exports = { getMovies, getMovieById };
