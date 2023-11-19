const app = require("./app");
require("dotenv").config({ path: "backend/config/config.env" });
const connectDatabase = require("./config/database");

//handle uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

require("./route");
const port = process.env.PORT;
connectDatabase();
const server = app.listen(port, () => {
  console.log(`server listen on http://localhost:${port}`);
});
//close the server if any unhandled error occur
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
