'user strict';

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  stripeId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: false,
  },
  subscribedDate: {
    type: Date,
    required: false,
  },
  defaultPaymentId: {
    type: String,
    required: false,
  },
});

const Users = mongoose.Schema({
  username: {type: String,required: true},
  password:{type: String,required:true},
  role:{ type: String,enum: ['admin','user'] ,default: 'user'},
  total: {type:Number,default:0},
  // cart: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'cart',
  //     required: 'cart is Required',
  //   },
  // ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
      required: 'order is Required',
    },
  ], 
  customer: {
    type: CustomerSchema,
    default: null,
    required: false,
  },

}, 

{
  timestamps: true,
},
);


Users.pre('find', function () {
  // this.populate('cart');
  this.populate('order');
});


module.exports = mongoose.model('Users',Users);