'use strict';

const Model = require('../model');
const schema = require('./cart-schema');

class cart extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new cart();