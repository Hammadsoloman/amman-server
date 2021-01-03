'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
// const basicAuth = require('../middleware/basic');
// const bearer = require('../middleware/bearer');
// const permissions=require('../middleware/permissions')
const productsCrud = require('../lib/models/product/product-collection');
const cartsCrud = require('../lib/models/cart/cart-collection');
const userSchema = require('../lib/models/user/users-schema')
const productsSchema=require('../lib/models/product/product-schema')
const cartSchema=require('../lib/models/cart/cart-schema')

route.post('/signup',signUp);
// basicAuth
route.post('/signin',signIn);
route.get('/users',allUsers);




/***************************************************PRODUCT CRUD METHODS**************************************/

// ,bearer
route.post('/product',postProduct);
function postProduct(req, res,next){
  let data = req.body;
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
route.get('/product/:id',getByIdProduct);
function getByIdProduct(req, res,next){
  let id = req.params.id;
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
route.put('/product/:id',updatedProductById);
function updatedProductById(req, res,next){
  let id = req.params.id;
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
route.delete('/product/:id',deleteProduct);
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
/***************************************************CART CRUD METHODS**************************************/

// route.post('/cart',postCart);
// function postCart(req, res,next){
//   let data = req.body;
//   cartsCrud.create(data)
//     .then(productAdded=>{
//       res.json(productAdded);
//     })
//     .catch(next);
// }
// //find All categories (GET)
// route.get('/cart',getAllCarts);
// function getAllCarts(req, res,next){
//   cartsCrud.get()
  
//     .then(allProducts =>{
//       res.json(allProducts);
//     })
//     .catch(next);
//     // .then(data => {
//     //   let output = {
//     //     Autherization:req.auth,
//     //     count: data.length,
//     //     results: data,
//     //   };
//     //   res.status(200).json(output);
//     // }).catch(next);
// }


// //find cart By Id (GET)
// route.get('/cart/:id',getByIdCart);
// function getByIdCart(req, res,next){
//   let id = req.params.id;
//   cartsCrud.get(id)
//     .then(productId =>{
//       res.json(productId);
//     })
//     .catch(next);
// }
// //update specific cart By Id (PUT)
// route.put('/cart/:id',updatedCartById);
// function updatedCartById(req, res,next){
//   let id = req.params.id;
//   let data = req.body;
//   cartsCrud.update(id,data)
//     .then(updatedProduct =>{
//       res.json(updatedProduct);
//     })
//     .catch(next);
// }
// // delete specific cart By Id (DELETE)
// route.delete('/cart/:id',deleteCart);
// function deleteCart(req, res,next){
//   let id = req.params.id;
//   cartsCrud.delete(id)
//     .then(() =>{
//       res.json({delete:`you delete the cart has Id: ${id}`});
//     })
//     .catch(next);
// }



/***************************************** ADMIN ****************************************************/
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
  route.get('/selectAll', getAllProductAdmin);
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
route.get('/users/:userId', async (req, res) => {
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
  route.put('/cart/:userId/:itemId', (req, res,next) => {
    console.log('req.params.itemIdId',req.params.itemId)
    let id = req.params.cartId;
    let data = req.body;
    console.log('data',data)
    cartsCrud.update(id,data)
      .then(updatedProduct =>{
        console.log('updatedProduct ',updatedProduct)

        res.json(updatedProduct);
      })
      .catch(()=>{
        res.status(500).send('error in the server when you Edit one item in the cart for the user');
      
      });
    })





/*************************************************************************************************/

function signUp(req,res,next){
  let newUser = req.body;
  console.log('newUser',newUser)
  userModel.save(newUser)
    .then(result =>{
      let token = userModel.generateToken(result);
      console.log('token in then signup',token)

      res.cookie('token', token, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly : false,
      });
      res.status(200).send({  token: token });
    })
    .catch(()=>{
      res.status(403).send('Invalid Signup! This userName is taken');

    });


}
// for sign In
function signIn(req,res,next){
  console.log('req.token')

  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 9999999),
    httpOnly : false,
  });
  res.status(200).send({  token: req.token });
  res.status(500).send('the error in sign in route');

}

// get all users
function allUsers(req,res,next){
  userModel.allUsers()
    .then(result =>{
      res.json(result);

    });
}







module.exports = route;