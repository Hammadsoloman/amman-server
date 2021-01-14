'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
const basicAuth = require('../middleware/basic');
const bearer = require('../middleware/bearer');
const permissions=require('../middleware/permissions')
const productsCrud = require('../lib/models/product/product-collection');
const cartsCrud = require('../lib/models/cart/cart-collection');
const userSchema = require('../lib/models/user/users-schema')
const productsSchema=require('../lib/models/product/product-schema')
const cartSchema=require('../lib/models/cart/cart-schema')
const orderSchema=require('../lib/models/order/order-schema')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {attachPaymentMethod} = require("../utils/utils")
const CustomerSchema = require('../lib/models/payment/payment-schema')
// var expressValidator = require('express-validator');
// const { check, validationResult } = require('express-validator')
const {v4 : uuidv4} = require('uuid')

const { BadRequest, NotFound, NotAuthorized } = require('../utils/errors');


// const { Router } = require("express");
// const User = require("../database/models/User");
// const { attachPaymentMethod } = require("../utils/stripe");

// const router = Router();

route.post('/signup',signUp);
// basicAuth
route.post('/signin',basicAuth,signIn);
route.get('/users',allUsers);




/***************************************************PRODUCT CRUD METHODS**************************************/

// ,bearer
route.post('/product',bearer,postProduct);
function postProduct(req, res,next){
  let data = req.body;

  if (!data.title || !data.desc || !data.price) {
    throw new BadRequest('Missing required fields: title or desc or price');
  }

  productsCrud.create(data)
    .then(productAdded=>{
      res.json(productAdded);
    })
    .catch(()=>{
      res.status(500).send('error in the server when you add new item');
    
    });
}
//find All products (GET)
route.get('/product',getAllProducts);
function getAllProducts(req, res,next){
  productsCrud.get()
  
    .then(allProducts =>{
      res.json(allProducts);
    })
    .catch(()=>{
      res.status(500).send('error in the server when you get all the item in product page');
    
    });
} 


//find category By Id (GET)
// ,bearer
route.get('/product/:id',bearer,getByIdProduct);
function getByIdProduct(req, res,next){
  let id = req.params.id;
  if (!id) {
    throw new NotFound('The id for this pagw not found');
  }

  productsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(()=>{
      res.status(500).send('error in the server when you getOneItem');
    
    });
}
//update specific catgeroy By Id (PUT)
// ,bearer
route.put('/product/:id',bearer,updatedProductById);
function updatedProductById(req, res,next){
  let id = req.params.id;
  if (!id) {
    throw new NotFound('The id for this pagw not found');
  }

  let data = req.body;
  productsCrud.update(id,data)
    .then(updatedProduct =>{
      res.json(updatedProduct);
    })
    .catch(()=>{
      res.status(500).send('error in the server when you updateOneItem');
    
    });
}
// delete specific catgeroy By Id (DELETE)
// ,bearer,permissions('admin')
route.delete('/product/:id',bearer,permissions('admin'),deleteProduct);
function deleteProduct(req, res,next){
  let id = req.params.id;
  productsCrud.delete(id)
    .then(() =>{
      res.json({delete:`you delete the product has Id: ${id}`});
    })
    .catch(()=>{
      res.status(500).send('error in the server when you delete OneItem, i used this route in the admin page');
    });
}


/***************************************** ADMIN CRUD METHODS ****************************************************/
// ,bearer,permissions('admin')
route.put('/select/:id',editOneProduct);
  function editOneProduct(req, res,next)  {
    productsCrud 
      .update(req.params.id,req.body)
      .then(data =>res.json(data))
      .catch(()=>{
        res.status(500).send('error in the server when you selectAll the items for the admin');
      }); 
  }
  // ,bearer,permissions('admin')
  route.get('/selectAll',getAllProductAdmin,);
  function getAllProductAdmin(req, res, next) {
    productsCrud
      .get()
      .then((data) => res.json(data))
      .catch(()=>{
        res.status(500).send('error in the server when you selectAll the items for the admin');
      }); 
  }


/***************************************One to many relation routes in mongoose for the cart screen******************************/

                                   /**********add to cart for one user***********/

// route.post('/users/:userId', async (req, res) => {
//   //Find a user
//   const user = await userSchema.findOne({ _id: req.params.userId });
//    console.log('user',user)
//   //Create a product
//   const product = new productsSchema();
//   // console.log('product',product)
//   // console.log('req.body.title',req.body.title)

//   product.title = req.body.title;
//   // console.log('product.title',product.title)
//   product.desc = req.body.desc;
//   product.price = req.body.price;

//   product.user = user._id;
//   console.log('product.user',product.user)

//   console.log('user',user)

//   await product.save();

//   // Associate user with product
//   console.log('user.product', user.products)
//   user.products.push(product._id);
//   await user.save();

//   res.send(product);
// }
// );

/***************************************add to cart********************** */
// ,bearer
route.post('/cart/:userId', async (req, res) => {
  //Find a user
  const user = await userSchema.findOne({ _id: req.params.userId });
  // const itemInCart = await cartSchema.findOne({ _id: req.body.title});
  // let itemInCart= state.cartItem.findOne({ _id: req.body.id })
  console.log('user',user)
  // console.log('itemInCart',itemInCart)
  // console.log('cartSchema',cartSchema)


  // if(!itemInCart){
   console.log('user',user)
   console.log('userId', req.params.userId)

  //Create a product
  const item = new cartSchema();
  console.log('item',item)
  console.log('req.body.title',req.body.title)

  item.title = req.body.title;
  console.log('item.title',item.title)
  item.desc = req.body.desc;
  item.price = req.body.price;
  item.quantity = req.body.quantity;
  item.image = req.body.image;

  item.user = user._id;
  console.log('item.user',item.user)

  console.log('user',user)

  await item.save();

  // Associate user with cart
  // console.log('item.product', cart.products)
  user.cart.push(item._id);
  await user.save();

  res.send(item);
  res.status(500).send('the error when you try to add item to the cart in post route');


  // }else{
  //   console.log('you try to add exicted item!')
  // }
}
);

                                    /***********Get the cart for one user***********/
  // ,bearer
route.get('/cart/:userId', async (req, res) => {
  const user = await userSchema.findOne({ _id: req.params.userId }).populate(
    'cart',
  );
  console.log('user.cart',user.cart)
  res.send(user.cart);
  res.status(500).send('the error when you try Get the cart for one user');

});

                                    /***********Get one user***********/
  // ,bearer
route.get('/users/:userId',bearer, async (req, res) => {
const user = await userSchema.findOne({ _id: req.params.userId })
  console.log('one user',user)
  res.send(user);
  res.status(500).send('the error when you try Get one user');

  });

                                  /**********Delete one item in the cart for the user***********/

  //  ,bearer
  route.delete('/cart/:userId/:itemId',  (req, res,next) => {
    console.log('req.params',req.params.itemId)
    let id = req.params.itemId;
  // await productsSchema.findByIdAndDelete(req.params.cartId);
  cartsCrud.delete(id)
    .then(() =>{
      // console.log(res.json)
      res.json({delete:`you delete the item has Id: ${id}`});
    })
    .catch(next);
});



                               /**********Edit one item in the cart for the user***********/
//  ,bearer
  route.put('/cart/:userId/:itemId', (req, res) => {
    console.log('req.params.itemIdId',req.params.itemId)
    let id = req.params.itemId;
    console.log('data in update',id)
    let data = req.body;
    console.log('data in update',data)

    cartsCrud.update(id,data)
      .then(updatedProduct =>{
        console.log('updatedProduct ',updatedProduct)

        res.json(updatedProduct);
      })
      .catch(()=>{
        res.status(500).send('error in the server when you Edit one item in the cart for the user');
      
      });
    })
 

/************************************************ORDER************************************************************/


route.post('/order/:userId',async (req, res) => {

  
  //Find a user
  const user = await userSchema.findOne({ _id: req.params.userId });

  if (!user) {
    throw new NotAuthorized('You are Not Authorized to do this order');
  }

  
  // const itemInCart = await cartSchema.findOne({ _id: req.body.title});
  // let itemInCart= state.cartItem.findOne({ _id: req.body.id })
  console.log('user',user)
  // console.log('itemInCart',itemInCart)
  // console.log('cartSchema',cartSchema)


  // if(!itemInCart){
   console.log('user',user)
   console.log('userId', req.params.userId)

  //Create a product
  const item = new orderSchema();
  console.log('item',item)
  console.log('req.body',req.body)
    let newBody=req.body
    console.log('newBodyafter adding ',newBody)
  console.log('item.title',item.title)
  item.title = newBody.title;
  console.log('item.title',item.title)
  item.desc = newBody.desc;
  item.price = newBody.price;
  item.quantity = newBody.quantity;
  item.image = newBody.image;

  item.user = user._id;
  console.log('item.user',item.user)

  /* the error after console of the user*/
  console.log('user',user)

  let foundError = ""

  await item.save()
  console.log('item after save',item)

  // .catch(()=>{
  //   //res.status(500).send('error in the server when you save the item');
  //   foundError = 'error in the server when you save the item'
  // });
  
  // Associate user with cart
  // console.log('item.product', cart.products)
  user.order.push(item._id);
  console.log('push item._id',item._id)

  await user.save()
  console.log('user after save',)
/*
UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'catch' of undefined.

Unhandled promise rejection. This error originated either by throwing inside of an async
function without a catch block, or by rejecting a promise which was not handled with .catch().
*/

  // .catch(()=>{
  //   //res.status(500).send('error in the server when you save the item in the user');
  //   foundError = 'error in the server when you save the user'
  // });

  if ( !foundError )
    res.send(item);
  else
    res.status(500).send('the error when you try to post the order');
    
}
);

                                    /***********Get the order for one user***********/
  // ,bearer
route.get('/order/:userId',async (req, res) => {
  const user = await userSchema.findOne({ _id: req.params.userId }).populate(
    'order',
  );
  console.log('user.order',user.order)



  let foundError = ""

  if ( !foundError ){
    console.log('!foundError in get order')
    res.send(user.order);
  }  else {
    res.status(500).send('the error when you try Get the order for one user');
  }
    

});

/****************************************************STRIPE***************************************************/


// route.post("/payment/methods/create", async (req, res) => {
//   console.log('in create payment route')
//   console.log('req',req)
//   console.log('req.body',req.body)

//   // i will send the username by the header, and the id by the body
//   // if (req.user) {
//     console.log('req.user',req.body)
//     const { id } = req.body;
//     if (!id) return res.sendStatus(400);
//     const { customer } = req.user;
//     console.log('customer',req.user)

//     const result = await attachPaymentMethod({
//       customer: customer.stripeId,
//       id,
//     });
//     console.log('result in post payment',result)

//     const update = await userSchema.findOneAndUpdate(
//       { username: req.user.username },
//       {
//         $set: { "customer.defaultPaymentId": result.id },
//       },
//       {
//         new: true,
//       }
//     );
//     console.log('update in post payment >>>>> to send it as a response',update)

//     return res.send(update);
//   // }
//   //  else return res.sendStatus(401);
// });




  
route.post("/payment/methods/create/:userId", async (req, res) => {
  console.log('in create payment route')
  console.log('req.body',req.body)

  // i will send the username by the header, and the id by the body
  // if (req.user) {

      //Find a user
  const user = await userSchema.findOne({ _id: req.params.userId });
  const item = new userSchema();
   
  console.log('user find from schema',user)
  console.log('item find from schema',item)

  // let newBody=req.body

  const { id } = req.body;
  console.log('id',id)

  console.log('item.customer',item.customer)

  item.customer.stripeId = id;  
  console.log('iditem.customer',item.customer)

  item.user = user._id;  
  console.log('item after customer and user in item',item.user)


    if (!id) return res.sendStatus(400);
    const { customer } = user.customer;
    console.log('customer',user.customer)

    const result = await attachPaymentMethod({
      customer: user.customer.stripeId,
      id,
    });
    console.log('result in post payment',result)

    const updatedUser =  [
      { username: user.username },
      {
        $set: { "customer.defaultPaymentId": result.id },
      },
      {
        new: true,
      }
    ]
    console.log('update in post payment >>>>> to send it as a response',updatedUser)

    return res.send(updatedUser);

});



route.post("/create/:userId", async (req, res) => {
  const { priceId } = req.body;

  const user = await userSchema.findOne({ _id: req.params.userId });
  // const item = new userSchema();

  const response = await createSubscription({
    customer: user.customer.stripeId,
    payment: user.customer.defaultPaymentId,
    price: priceId,
  });
  res.send(response);
});


/*******************************************************Create stripe*****************************/
route.post("/stripe_payments", (req, res) => {
  const  token  = req.body.token;
  const  amount = req.body.amount;

  console.log("req.body stripe_payments", req.body);
  console.log("amount stripe_payments", amount);
  console.log("amount stripe_payments", product.price);
  // const idempontencyKey = uuid();
  // console.log('idempontencyKey',idempontencyKey)
  const idempontencyKey = uuidv4()

  var stripe = require("stripe")(
    "sk_test_51I6GFrAAyiIKrt7bV0ujpx8Na80sPOiyEaVnm4U8sRqWON8sYdQlATgg8Cr9pZEZzmQtyXLOjeseZNGOfSZojVV300mA4IiLIn"
    );
    console.log('stripe',stripe)

    console.log('stripe.customers',stripe.customers)

  return stripe.customers
  .create({
    email: token.email,
    source: token.id
  })
  .then(customer => {
        console.log('customers in then in the backend')
        console.log('customer in stripe_payment',customer)
          stripe.charges.create(
              {
                  amount: amount,
                  currency: "Inspire LLC",
                  customer: customer.id,
                  receipt_email: token.email,
                  // description: `purchase of ${product.name}`,
                  shipping: {
                      name: token.card.name,
                      address: {
                          country: token.card.address_country
                      }
                  }
              },
              { idempontencyKey }
          );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
});


/*****************************************************Auth***************************************/
function signUp(req,res,next){
  let newUser = req.body;

  if (!newUser.username || !newUser.password ) {
    throw new BadRequest('Missing required fields: username or password');
  }



  console.log('newUser in signUp ',newUser)
  userModel.save(newUser)
    .then(result =>{
      console.log('result in then signup',result) 

      let token = userModel.generateToken(result);
      console.log('token in then signup',token)

      res.cookie('token', token, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly : false,
      });
      res.status(200).send({  token: token });
    })
    .catch(()=>{
      res.status(403).send('Invalid Signup!');

    });


}
// for sign In
function signIn(req,res,next){
  
  console.log('req.token in signin',req.token)
  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 9999999),
    httpOnly : false,
  });

  let foundError = ""

  if (!foundError){
    console.log('!foundError in signin',!foundError)
  res.send({  token: req.token });
        }else{
  res.status(500).send('the error in sign in route');
   }


  // res.status(200).send({  token: req.token });
  // res.status(500).send('the error in sign in route');

}

// get all users
function allUsers(req,res,next){
  userModel.allUsers()
    .then(result =>{
      res.json(result);

    });
}







module.exports = route;