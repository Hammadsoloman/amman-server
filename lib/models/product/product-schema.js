'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
    category: { type: String, required: true },
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    quantity: {type:Number,default:1},
    inCart:{type:Boolean, default:false},
});


module.exports = mongoose.model('products',products);