'use strict';

const Model = require('../model');
const orderSchema = require('./order-schema');

class Order extends Model{
  constructor(){
    super(orderSchema);
  }
}

module.exports = new Order();