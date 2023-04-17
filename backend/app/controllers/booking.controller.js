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

const booking = async (req, res) => {
  connection.query(
    "INSERT INTO bookings (quantity, showtime_id, user_id) VALUES (?, ?, ?)",
    [req.body.quantity, req.body.showtime_id, req.body.user_id],
    (err, result) => {
      if (err) throw err;
      res.send(`User added to database with ID: ${result.insertId}`);
      const seats = req.body.seats;
      seats.forEach((seat) => {
        connection.query("CALL SP_PickSeat(?, ?) ", [
          result.insertId,
          seat.seat_id,
        ]);
      });
    }
  );
};

const getTicketByUserId = async (req, res) => {
  connection.query(
    "SELECT bookings.booking_id, quantity, start_time, price, title, theatres.theatre_id, name, address FROM bookings, showtimes, movies, theatres WHERE bookings.showtime_id = showtimes.showtime_id AND showtimes.movie_id = movies.movie_id  AND theatres.theatre_id = showtimes.theatre_id AND user_id = ?",
    req.params.userId,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteTicket = async (req, res) => {
  connection.query(
    "UPDATE seats SET status = 0, booking_id = NULL WHERE booking_id = ? ",
    req.params.bookingId,
    (err, result) => {
      if (err) throw err;
    }
  );
  connection.query(
    "DELETE FROM bookings WHERE booking_id = ?",
    req.params.bookingId,
    (err, result) => {
      if (err) throw err;
      res.send("Ticket deleted successfully.");
    }
  );
};

module.exports = { getSeats, booking, getTicketByUserId, deleteTicket };
