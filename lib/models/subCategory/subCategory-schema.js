

const mongoose = require('mongoose');

const category = mongoose.Schema({
  subName: { type: String, required: true },
});

module.exports = mongoose.model('subCategory', subCategory);