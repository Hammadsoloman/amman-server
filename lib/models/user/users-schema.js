'user strict';

const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: {type: String,required: true},
  password:{type: String,required:true},
  role:{ type: String, default: 'user', enum: ['admin','user']},
  total: {type:Number,default:0},
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: 'products is Required',
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cart',
      required: 'cart is Required',
    },
  ]

}, 

{
  timestamps: true,
},
);


Users.pre('find', function () {
  this.populate('products');
  this.populate('cart');

});


module.exports = mongoose.model('Users',Users);