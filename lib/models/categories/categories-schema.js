const mongoose = require('mongoose');

const category = mongoose.Schema({
  displayName: { type: String, required: true },
  description: { type: String, required: false },
  sub: [
    {
      subName: { type: String, required: false },
    },
  ], 
});

module.exports = mongoose.model('category', category);