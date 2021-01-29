const mongoose = require('mongoose');

const newCategory = mongoose.Schema({
  displayName: { type: String, required: true },
  // sub: { type: Object, required: false, unique:true },
  // sub:[{
  //   subName :{ type: String, required: true },
  // }]
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategory',
      required: false,
    },
  ], 
});



newCategory.pre('find', function () {
  this.populate('subCategory');
});

module.exports = mongoose.model('newCategory', newCategory);