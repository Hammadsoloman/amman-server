'use strict';

function getModel(req,res,next){
  let model = req.params.model;
  if(model==='products' || model === 'categories'){
    req.model = require(`../lib/models/${model}/${model}.collection`);
    next();
    return; 
  }
  else{
    next('Error inValid Model');
    return; 
  }
}

module.exports = getModel;