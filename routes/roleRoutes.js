const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const { addRole, getsRoles } = require("../controllers/role");

router.use(verifyToken);

router.post("/", (req, res) => {
  addRole(req, res);
});

router.get("/", (req, res) => {
  getsRoles(req, res);
});

module.exports = router;
