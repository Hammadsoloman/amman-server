'user strict';

const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: {type: String,required: true},
  password:{type: String,required:true},
  role:{ type: String, default: 'user', enum: ['admin','user']},
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });




users.virtual('products', {
  ref: 'products',
  localField: 'title',
  foreignField: 'author',
  justOne: false,
});

users.pre('find', function () {
  this.populate('products');
});


module.exports = mongoose.model('Users',Users);