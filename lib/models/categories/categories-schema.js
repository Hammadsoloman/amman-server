const mongoose = require('mongoose');

const category = mongoose.Schema({
  displayName: { type: String, required: true },
  description: { type: String, required: false },
  sub: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory',
      required: false,
    },
  ], 
});

module.exports = mongoose.model('category', category);