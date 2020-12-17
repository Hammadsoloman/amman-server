'use strict';

module.exports = (req,res,next)=>{
  console.log(`REQUEST ==> Method: (${req.method})+ Path: (${req.path}) +Time=>${req.full_time}`);
  next();
};