const express = require("express");
const cookieparser = require("cookie-parser");
const auth = require("./routes/authRoutes");
const role = require("./routes/roleRoutes");
const community = require("./routes/communityRoutes");
const member = require("./routes/memberRoutes");
const app = express();

app.use(express.json());
app.use(cookieparser());
app.use("/v1/auth", auth);
app.use("/v1/role", role);
app.use("/v1/community", community);
app.use("/v1/member", member);

module.exports = app;
