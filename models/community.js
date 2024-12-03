const mongoose = require("mongoose");
const community = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("communityDoc", community);
