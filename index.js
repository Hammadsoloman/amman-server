'use strict';

const mongoose = require('mongoose');
const serverMod = require('./lib/server');
serverMod.start(); 
const MONGO_URL = 'mongodb+srv://Hammad:0000@cluster0.nr8bq.mongodb.net/newShop?retryWrites=true&w=majority';
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGO_URL,mongooseOptions);
