'use strict';

function errorHandler(req,res,err){
  res.status(500).json({err: err});
}

module.exports = errorHandler;