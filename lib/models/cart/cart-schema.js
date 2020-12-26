'use strict';

const mongoose = require('mongoose');

const cart = mongoose.Schema({
  cart: { type: Array, required: false },
});



module.exports = mongoose.model('cart',cart);