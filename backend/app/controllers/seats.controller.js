const connection = require("../utils/mysql.util");

const getSeats = async (req, res) => {
  connection.query(
    "SELECT * FROM seats WHERE theatre_id = ?",
    [req.params.theatreId],
    (error, results) => {
      if (error) {
        console.log("Error getting seats:", error);
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    }
  );
};

const getSeatsByBookingId = async (req, res) => {
  connection.query(
    "CALL SP_getSeatsByBookingId(?)",
    [req.params.bookingId],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
};

module.exports = { getSeats, getSeatsByBookingId };
