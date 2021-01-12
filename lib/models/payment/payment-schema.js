'use strict';

const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    stripeId: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: false,
    },
    subscribedDate: {
      type: Date,
      required: false,
    },
    defaultPaymentId: {
      type: String,
      required: false,
    },
  });
  

  module.exports = mongoose.model('CustomerSchema',CustomerSchema);