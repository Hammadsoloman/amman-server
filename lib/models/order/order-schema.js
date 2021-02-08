'use strict';

// const mongoose = require('mongoose');

// const order = mongoose.Schema({
//     title:{type:String,required:true},
//     desc: {type:String,required:true},
//     price: {type:Number,required:true},
//     image: { type: String, required: false },
//     quantity: {type:Number,default:1},    
// });



// module.exports = mongoose.model('order',order);

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        desc: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        // product: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'products',
        //   required: true,
        // },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
  
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    // paymentResult: {
    //   id: String,
    //   status: String,
    //   update_time: String,
    //   email_address: String,
    // },
//     isPaid: { type: Boolean, default: false },
//     paidAt: { type: Date },
//     isDelivered: { type: Boolean, default: false },
//     deliveredAt: { type: Date },
//   },
//   {
    
    // timestamps: true,
  }
);

module.exports = mongoose.model('Order',orderSchema);
