'user strict';

const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: {type: String,required: true},
  password:{type: String,required:true},
  role:{ type: String, default: 'user', enum: ['admin','user']},
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: 'products is Required',
    },
  ],
}, 
// { toObject: { virtuals: true }, toJSON: { virtuals: true } }

{
  timestamps: true,
},
);




// Users.virtual('products', {
//   ref: 'products',
//   localField: 'username',
//   foreignField: 'title',
//   justOne: false,
// });

Users.pre('find', function () {
  this.populate('products');
});


module.exports = mongoose.model('Users',Users);