const mongoose = require("mongoose");
const member = mongoose.Schema({
  community: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("memberDoc", member);
