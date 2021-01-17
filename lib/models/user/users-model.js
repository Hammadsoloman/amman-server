'use strict';
require('dotenv').config();
const users = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET =   'homesweet';
const { createStripeCustomer } = require("../../../utils/utils");

class UsersModel{
  async authenticate(username, password){
    return new Promise((resolve,reject) =>{
      return users.find({username:username})
        .then(result =>{
          if(result.length){
            bcrypt.compare(password, result[0].password)
              .then(final =>{
                if(final){
                  return  resolve(users.find({username:username}));
                }
                else{
                  return reject('error');
                }
              });
          }
          else{
            return reject('error');
          }
        });   
    });
   
  }

  async authenticateOAuth(user){
    console.log('username in authenticateOAuth',user)
    return new Promise((resolve,reject) =>{
      return users.find({user})
        // .then(result =>{
        //   if(result.length){
        //     bcrypt.compare(password, result[0].password)
              .then(final =>{
                console.log('final in authenticateOAuth',final)

                if(final){
                  return  resolve(users.find({user}));
                }
                else{
                  return reject('error');
                }
              });
          // }
          // else{
          //   return reject('error');
          // }
        // });   
    });
   
  }

  generateToken(user){
    let token = jwt.sign({username: user.username, role:user.role },SECRET,{
      expiresIn: '1d',
    });
    console.log('token in generate token')
    return token;
  }

  generateTokenOAuth(user){
    console.log('user in generateTokenOAuth',user)
    let token = jwt.sign({username: user.name, role:user.role },SECRET,{
      expiresIn: '1d',
    });
    console.log('token in generate generateTokenOAuth',token)
    return token;
  }
  

  async save(newUser){
    return users.find({username: newUser.username})
    
      .then(async result=>{
        // console.log('result in save',result)
        
        
        if(!result[0]){
          
          console.log('newUser in save - user model',newUser)
          const stripeCustomer = await createStripeCustomer(newUser.username);
          console.log('stripeCustomer in save - user model',stripeCustomer)

          newUser.password = await bcrypt.hash(newUser.password,5);
          // const stripeCustomer = await createStripeCustomer({ username });
          // console.log('stripeCustomer in save - user model',createStripeCustomer)
          console.log('stripeCustomer in save - user model',stripeCustomer)

          newUser.customer= { stripeId: stripeCustomer.id };
          console.log('newUser in save - user model',newUser)
          
          // const newUser = await User.create({
          //   id,
          //   email,
          //   customer: { stripeId: stripeCustomer.id },
          // });

          let newUserSave = new users(newUser);
          console.log('stripeCustomer in save - user model',stripeCustomer)

          let final = await newUserSave.save();
          console.log('final that we return in save - user model',final)

          return final;
        }
          return Promise.reject();
        
      });
    
  }
  allUsers(){
    return users.find({});
  }

  verfiyToken(token){
    return jwt.verify(token, SECRET, (err, verifiedJwt) => {
      if(err){
        return Promise.reject();
      }else{
        let username = verifiedJwt['username'];
        return users.find({username})
          .then(result =>{
            if(result.length){
              return Promise.resolve(verifiedJwt);
            }
            else{
              return Promise.reject();
            }
          });
      }
    });
  }
  can(permision){
    if(permision){
      return Promise.resolve(true);
    }
    else{
      return Promise.resolve(false);
    }
  }
}

module.exports = new UsersModel();