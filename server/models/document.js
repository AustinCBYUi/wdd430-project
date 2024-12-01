const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Document', documentSchema);
