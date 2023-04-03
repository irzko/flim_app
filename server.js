const app = require("./app");

const port = process.env.PORT;

app.listen(port || 8001, () => {
  console.log(`Server listening on port ${port || 8001}`);
});
