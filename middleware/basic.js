'use strict';

const userModel = require('../lib/models/user/users-model');
const base64 = require('base-64');

function authSignIn(req,res,next){

  if(!req.headers.authorization){
    next('Invalid SignIn');
    return;
  }
  let base = req.headers.authorization.split(' ')[1];
  console.log('base', base)
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



// 'use strict';

// const userModel = require('../lib/models/user/users-model');
// // const base64 = require('base-64');

// function authSignIn(req,res,next){
//   console.log('req.body in the basic auth', req.body)
//   if(!req.body){
//     next('Invalid SignIn');
//     return;
//   }
//   let base = req.body;
//   console.log('base in the basic auth', req.body)
//   let user = base.username;
//   let password = base.password;

//   console.log('user,password', user,password)

//   userModel.authenticate(user,password)
//     .then(result =>{
//       console.log('result in basic auth', result)

//       req.token = userModel.generateToken(result[0]);
//       next();
//     })
//     .catch(err=>{
//       next('Your Input is uncorrect');
//     });
// }

// module.exports = authSignIn;