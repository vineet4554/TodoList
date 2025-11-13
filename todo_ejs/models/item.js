const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  work: String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item };
