'use strict';

const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    stripeId: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    receipt_email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  });
  


  module.exports = mongoose.model('CustomerSchema',CustomerSchema);