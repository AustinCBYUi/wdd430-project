const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  sender: { type:
  mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('messages', messageSchema);
