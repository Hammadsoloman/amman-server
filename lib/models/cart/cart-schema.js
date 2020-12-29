'use strict';

const mongoose = require('mongoose');

const cart = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    quantity: {type:Number}, 
});



module.exports = mongoose.model('cart',cart);