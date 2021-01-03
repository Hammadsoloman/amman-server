'use strict';

const mongoose = require('mongoose');

const cart = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    quantity: {type:Number,default:1,min:1},
    inCart:{type:Boolean, default:true}
});



module.exports = mongoose.model('cart',cart);


// Wallet: { type: Array, required: false },
