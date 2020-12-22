'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
const basicAuth = require('../middleware/basic');
const productsCrud = require('../lib/models/product/product-collection');
const cartsCrud = require('../lib/models/cart/cart-collection');



route.post('/signup',signUp);
// basicAuth
route.post('/signin',signIn);
route.get('/users',allUsers);












/***************************************************PRODUCT CRUD METHODS**************************************/


route.post('/product',postProduct);
function postProduct(req, res,next){
  let data = req.body;
  productsCrud.create(data)
    .then(productAdded=>{
      res.json(productAdded);
    })
    .catch(next);
}
//find All categories (GET)
route.get('/product',getAllProducts);
function getAllProducts(req, res,next){
  productsCrud.get()
  
    .then(allProducts =>{
      res.json(allProducts);
    })
    .catch(next);
    // .then(data => {
    //   let output = {
    //     Autherization:req.auth,
    //     count: data.length,
    //     results: data,
    //   };
    //   res.status(200).json(output);
    // }).catch(next);
}


//find category By Id (GET)
route.get('/product/:id',getByIdProduct);
function getByIdProduct(req, res,next){
  let id = req.params.id;
  productsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(next);
}
//update specific catgeroy By Id (PUT)
route.put('/product/:id',updatedProductById);
function updatedProductById(req, res,next){
  let id = req.params.id;
  let data = req.body;
  productsCrud.update(id,data)
    .then(updatedProduct =>{
      res.json(updatedProduct);
    })
    .catch(next);
}
// delete specific catgeroy By Id (DELETE)
route.delete('/product/:id',deleteProduct);
function deleteProduct(req, res,next){
  let id = req.params.id;
  productsCrud.delete(id)
    .then(() =>{
      res.json({delete:`you delete the product has Id: ${id}`});
    })
    .catch(next);
}
/***************************************************CART CRUD METHODS**************************************/

route.post('/cart',postCart);
function postCart(req, res,next){
  let data = req.body;
  cartsCrud.create(data)
    .then(productAdded=>{
      res.json(productAdded);
    })
    .catch(next);
}
//find All categories (GET)
route.get('/cart',getAllCarts);
function getAllCarts(req, res,next){
  cartsCrud.get()
  
    .then(allProducts =>{
      res.json(allProducts);
    })
    .catch(next);
    // .then(data => {
    //   let output = {
    //     Autherization:req.auth,
    //     count: data.length,
    //     results: data,
    //   };
    //   res.status(200).json(output);
    // }).catch(next);
}


//find category By Id (GET)
route.get('/cart/:id',getByIdCart);
function getByIdCart(req, res,next){
  let id = req.params.id;
  cartsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(next);
}
//update specific catgeroy By Id (PUT)
route.put('/cart/:id',updatedCartById);
function updatedCartById(req, res,next){
  let id = req.params.id;
  let data = req.body;
  cartsCrud.update(id,data)
    .then(updatedProduct =>{
      res.json(updatedProduct);
    })
    .catch(next);
}
// delete specific catgeroy By Id (DELETE)
route.delete('/cart/:id',deleteCart);
function deleteCart(req, res,next){
  let id = req.params.id;
  cartsCrud.delete(id)
    .then(() =>{
      res.json({delete:`you delete the cart has Id: ${id}`});
    })
    .catch(next);
}



/***************************************** ADMIN ****************************************************/

route.put('/select/:id', editOneProduct);
  function editOneProduct(req, res,next)  {
    productsCrud 
      .update(req.params.id,req.body)
      .then(data =>res.json(data))
      .catch(err=>next(err.message));  
  }
  
  route.get('/selectAll', getAllProductAdmin);
  function getAllProductAdmin(req, res, next) {
    productsCrud
      .get()
      .then((data) => res.json(data))
      .catch((err) => next(err.message));
  }





/*************************************************************************************************/
// route.get('/oauth',OAuthMiddleware,signInGitHub);
// for signUp
function signUp(req,res,next){
  let newUser = req.body;
  userModel.save(newUser)
    .then(result =>{
      let token = userModel.generateToken(result);
      res.cookie('token', token, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly : false,
      });
      res.status(200).send({  token: token });
    })
    .catch(()=>{
      res.json({error: 'This userName is taken'});
    });


}
// for sign In
function signIn(req,res,next){
  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 9999999),
    httpOnly : false,
  });
  res.status(200).send({  token: req.token });
}

// get all users
function allUsers(req,res,next){
  userModel.allUsers()
    .then(result =>{
      res.json(result);

    });
}




module.exports = route;