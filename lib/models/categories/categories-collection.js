'use strict';

const Model = require('../model');
const schema = require('./categories-schema');

class category extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new category();