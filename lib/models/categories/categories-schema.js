const mongoose = require('mongoose');

const category = mongoose.Schema({
  displayName: { type: String, required: true },
  description: { type: String, required: false },
  // sub: { type: Object, required: false, unique:true },
  sub:[{
    subName :{ type: String, required: true },
  }]
});

module.exports = mongoose.model('category', category);