'use strict';

const mongoose = require('mongoose');

const cart = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    quantity:{type:Number,required:false},
    image: { type: String, required: false },
});



module.exports = mongoose.model('cart',cart);