const connection = require("../utils/mysql.util");

const createUser = async (req, res) => {
  connection.query("INSERT INTO users SET ?", req.body, (err, result) => {
    if (err) throw err;
    res.send(`User added to database with ID: ${result.insertId}`);
  });
};

const getUserById = async (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    req.params.id,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

const updateUserById = async (req, res) => {
  connection.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send("User updated successfully.");
    }
  );
};

const login = async (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    req.body.email,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found");
      } else {
        if (result[0].password === req.body.password) {
          res.send("Login successful");
        } else {
          res.send("Password incorrect");
        }
      }
    }
  );
};

module.exports = { getUserById, createUser, updateUserById, login };
