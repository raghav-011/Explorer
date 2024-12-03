const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken");
const {
  addCommunity,
  getsCommunity,
  getAllMembers,
  getOwnedCommunity,
  getOwnedMember,
} = require("../controllers/community");

router.use(verifyToken);

router.post("/", (req, res) => {
  addCommunity(req, res);
});

router.get("/", (req, res) => {
  getsCommunity(req, res);
});

router.get("/me/owner", (req, res) => {
  getOwnedCommunity(req, res);
});

router.get("/me/member", (req, res) => {
  getOwnedMember(req, res);
});

router.get("/:id/members", (req, res) => {
  getAllMembers(req, res);
});

module.exports = router;
