'use strict';

const userModel = require('../lib/models/user/users-model');
const base64 = require('base-64');

function authSignIn(req,res,next){
  if(!req.headers.authorization){
    next('Invalid SignIn');
    return;
  }
  let base = req.headers.authorization.split(' ')[1];
  let [user,password] = base64.decode(base).split(':');
  userModel.authenticate(user,password)
    .then(result =>{
      req.token = userModel.generateToken(result[0]);
      next();
    })
    .catch(err=>{
      next('Your Input is uncorrect');
    });
}

module.exports = authSignIn;