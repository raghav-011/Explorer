const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
databaseConnectivity = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = databaseConnectivity;
