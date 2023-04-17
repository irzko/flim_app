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
    "SELECT * FROM users WHERE username = ?",
    req.body.username,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res
          .status(401)
          .send({
            status: "error",
            message: "Sai tên người dùng hoặc mật khẩu",
          });
      } else {
        if (result[0].password === req.body.password) {
          const data = result[0];
          delete data.password;
          delete data.email;
          res.status(200).send({
            status: "success",
            message: "Login successful",
            data: data,
          });
        } else {
          res.status(401).send({
            statusbar: "error",
            message: "Sai tên người dùng hoặc mật khẩu",
          });
        }
      }
    }
  );
};

const getIdByUsername = async (req, res) => {
  connection.query(
    "SELECT user_id FROM users WHERE username = ?",
    req.params.username,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  login,
  getIdByUsername,
};
