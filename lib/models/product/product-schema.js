'use strict';

const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema(
    {
    //   name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    },
  );


const products = mongoose.Schema({
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    image: { type: String, required: false },
    quantity: {type:Number,default:1},
    inCart:{type:Boolean, default:false},
    rating: { type: Number, default: 0, required: true },
    numReviews: { type: Number, default: 0, required: true },
    reviews: [reviewSchema],
})



module.exports = mongoose.model('products',products);