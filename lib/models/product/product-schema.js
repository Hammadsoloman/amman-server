'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    quantity:{type:Number,required:false},
    cart: { type: Array, required: false },
});



module.exports = mongoose.model('products',products);