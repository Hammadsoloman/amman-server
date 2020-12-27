'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
const basicAuth = require('../middleware/basic');
const productsCrud = require('../lib/models/product/product-collection');
const cartsCrud = require('../lib/models/cart/cart-collection');
const userSchema = require('../lib/models/user/users-schema')
const productsSchema=require('../lib/models/product/product-schema')

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


//find cart By Id (GET)
route.get('/cart/:id',getByIdCart);
function getByIdCart(req, res,next){
  let id = req.params.id;
  cartsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(next);
}
//update specific cart By Id (PUT)
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
// delete specific cart By Id (DELETE)
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


/***************************************One to many relation routes in mongoose for the cart screen******************************/

                                   /**********Get the products for one user***********/

route.post('/cart/:userId', async (req, res) => {
  //Find a user
  const user = await userSchema.findOne({ _id: req.params.userId });
   console.log('user',user)
  //Create a product
  const product = new productsSchema();
  // console.log('product',product)
  // console.log('req.body.title',req.body.title)

  product.title = req.body.title;
  // console.log('product.title',product.title)
  product.desc = req.body.desc;
  product.price = req.body.price;

  product.user = user._id;
  console.log('product.user',product.user)

  console.log('user',user)

  await product.save();

  // Associate user with product
  console.log('user.product', user.products)
  user.products.push(product._id);
  await user.save();

  res.send(product);
}
);

                                   /**********Get the products for one user***********/
route.get('/cart/:userId', async (req, res) => {
  const user = await userSchema.findOne({ _id: req.params.userId }).populate(
    'products',
  );
  console.log('user',user)
  res.send(user);
});

                                  /**********Delete the product for the user***********/
  route.delete('/cart/:userId/:productId',  (req, res,next) => {
    console.log('req.params',req.params.productId)
    let id = req.params.productId;
  // await productsSchema.findByIdAndDelete(req.params.productId);
  productsCrud.delete(id)
    .then(() =>{
      // console.log(res.json)
      res.json({delete:`you delete the product has Id: ${id}`});
    })
    .catch(next);
});



                                  /**********Edit the product for the user***********/

  route.put('/cart/:userId/:productId', (req, res,next) => {
    console.log('req.params.productId',req.params.productId)
    let id = req.params.productId;
    let data = req.body;
    console.log('data',data)
    productsCrud.update(id,data)
      .then(updatedProduct =>{
        res.json(updatedProduct);
      })
      .catch(next);
    })
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