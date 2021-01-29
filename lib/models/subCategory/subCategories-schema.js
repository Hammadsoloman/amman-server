const mongoose = require('mongoose');

const subCategory = mongoose.Schema({
    subName: { type: Object, required: false, unique:true },
});

module.exports = mongoose.model('subCategory', subCategory);










