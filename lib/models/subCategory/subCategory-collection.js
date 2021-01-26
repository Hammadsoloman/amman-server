

'use strict';

const Model = require('../model');
const schema = require('./subCategory-schema');

class subCategory extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new subCategory();