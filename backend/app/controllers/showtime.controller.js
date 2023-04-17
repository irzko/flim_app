const connection = require("../utils/mysql.util");

const getShowtimes = async (req, res) => {
  connection.query(
    "SELECT * FROM Showtimes WHERE movie_id = ? AND theatre_id = ? AND DATE(start_time) = ?",
    [req.body.movie_id, req.body.theatre_id, req.body.date],
    (error, results) => {
      if (error) {
        console.log("Error getting showtimes:", error);
      } else {
        res.send(results);
      }
    }
  );
};

const getFullShowtimes = async (req, res) => {
  connection.query(
    "SELECT * FROM Showtimes WHERE movie_id = ? AND theatre_id = ? AND start_time = ?",
    [req.body.movie_id, req.body.theatre_id, req.body.date],
    (error, results) => {
      if (error) {
        console.log("Error getting showtimes:", error);
      } else {
        res.send(results);
      }
    }
  );
};

module.exports = { getShowtimes, getFullShowtimes };
