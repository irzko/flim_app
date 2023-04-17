const connection = require("../utils/mysql.util");

const getTheatres = async (req, res) => {
  connection.query("SELECT * FROM Theatres", (error, results) => {
    if (error) {
      console.log("Error getting theatres:", error);
      res.status(500).send(error);
    } else {
      res.send(results);
    }
  });
};

const getTheatreById = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM Theatres WHERE theatre_id = ?",
    [id],
    (error, results) => {
      if (error) {
        console.log(`Error getting theatre with ID ${id}:`, error);
        res.status(500).send(error);
      } else if (results.length === 0) {
        res.status(404).send("Theatre not found");
      } else {
        res.send(results[0]);
      }
    }
  );
};

const getTheatreByDate = async (req, res) => {
  connection.query(
    "SELECT DISTINCT showtimes.theatre_id, name FROM showtimes, theatres WHERE showtimes.theatre_id = theatres.theatre_id AND DATE(start_time) = ? AND address LIKE ? AND movie_id = ?",
    [req.body.date, "%" + req.body.location + "%", req.body.movie_id],
    (error, results) => {
      if (error) {
        console.log("Error getting theatres:", error);
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = { getTheatreById, getTheatres, getTheatreByDate };
