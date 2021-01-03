'use strict';

const userModel = require('../lib/models/user/users-model');
/**
 * this function will check  the validation of login 
 * test if the header have an authorization then decode it and generate token
*/
function bearerAuth(req,res,next){

    if(!req.headers.authorization){
    console.log("req.headers.authorization in bearer",req.headers.authorization)
      next('You are not signIn');
      return;
    }
    // console.log(req.headers.authorization,'headers authorization @@'); //Bearer c2Fsc2FAZ2ltYWwuY29tOmFsaV8xMjM
    let bearerToken = req.headers.authorization.split(' ')[1];
    console.log("req.headers",req.headers)
    userModel.verfiyToken(bearerToken)
      .then(userObj =>{
        // req.user = userObj;
        req.user = {
          id: userObj._id,
          username : userObj.username,
          capabilities : userObj.capabilities,
          role:userObj.role,
        };
        console.log("role in user object",userObj.role)

        next();
      }).catch(err =>{
        console.log('the error in bearer is ',err);
        next('You are not verfiy');
      });
        
  
  }
  
  module.exports = bearerAuth;