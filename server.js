const app = require("./app");
const connection = require("./app/utils/mysql.util");
const port = process.env.PORT;

const startServer = () => {
  connection.connect((error) => {
    if (error) {
      console.log("Error connecting to database:", error);
    } else {
      console.log("Connected to database");
    }
  });
  app.listen(port || 8001, () => {
    console.log(`Server running on port ${port || 8001}`);
  });
};

startServer();
