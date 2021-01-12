'use strict';

const Model = require('../model');
const paymentSchema = require('./payment-schema');

class Customer extends Model{
  constructor(){
    super(paymentSchema);
  }
}

module.exports = new Customer();