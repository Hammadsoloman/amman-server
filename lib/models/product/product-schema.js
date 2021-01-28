'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    quantity: {type:Number,default:1},
    inCart:{type:Boolean, default:false},
    // category: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'category',
    //       required: 'category is Required',
    //     },
    //   ], 
},{toObject:{virtual:true},toJSON:{virtual:true}});


// first two category from category-schema
products.virtual('categorySchema',{
  ref:'categorySchema',
  localField:'category',
  foreignField:'category',
  justOne:true,
  
});



module.exports = mongoose.model('products',products);