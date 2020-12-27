'use strict';

const mongoose = require('mongoose');

const cart = mongoose.Schema({
  author: {type: String,required: true},
  cart: { type: Array, required: false },
});



module.exports = mongoose.model('cart',cart);