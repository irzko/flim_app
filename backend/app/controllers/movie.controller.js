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
  connection.query("CALL SP_GetMovieByID(?);", [id], (error, results) => {
    if (error) {
      console.log(`Error getting movie with ID ${id}:`, error);
      res.status(500).send(error);
    } else if (results.length === 0) {
      res.status(404).send("Movie not found");
    } else {
      res.send(results[0]);
    }
  });
};

const findMovieByName = async (req, res) => {
  connection.query(
    "SELECT * FROM Movies WHERE title LIKE ?",
    "%" + req.params.title + "%",
    (error, results) => {
      if (error) {
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = { getMovies, getMovieById, findMovieByName };
