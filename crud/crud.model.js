const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  active: Boolean,
});

module.exports = mongoose.model('Record', recordSchema);