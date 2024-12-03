const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const { addMember, deleteMember } = require("../controllers/member");

router.use(verifyToken);

router.post("/", (req, res) => {
  addMember(req, res);
});

router.delete("/:id", (req, res) => {
  deleteMember(req, res);
});

module.exports = router;
