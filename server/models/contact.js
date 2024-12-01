const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  imageUrl: { type: String },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
});

module.exports = mongoose.model('Contact', contactSchema);
