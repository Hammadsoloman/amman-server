'use strict';

const Model = require('../model');
const schema = require('./categories-schema');

class newCategory extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new newCategory();