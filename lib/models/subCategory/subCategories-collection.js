'use strict';

const Model = require('../model');
const schema = require('./subCategories-schema');

class subCategory extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new subCategory();