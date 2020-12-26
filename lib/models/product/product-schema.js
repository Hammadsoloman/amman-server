'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    inCart:{type:Boolean,default : false},
    count: {type:Number,default:0},
    total: {type:Number,default:0},
});



module.exports = mongoose.model('products',products);