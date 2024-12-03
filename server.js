const databaseConnectivity = require("./config/database");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "./config/config.env" });
app.listen(process.env.PORT, () => {
  databaseConnectivity();
  console.log(`Server running on ${process.env.PORT}`);
});
