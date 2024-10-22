const app = require("./index");

const dotenv = require("dotenv");
const connectDatabase = require("./src/db/db");
dotenv.config({ path: "config.env" });

const port = process.env.PORT || 3000;

connectDatabase()
  .then(() => {
    console.log("Database has been connected successfully.");
    app.listen(8000, () => {
      console.log(`server has been started on port ${port}.`);
    });
  })
  .catch((error) => {
    console.log("couldnot connect to the database.");
  });
