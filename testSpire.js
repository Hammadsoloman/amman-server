
route.post('/order/:userId',async (req, res) => {

  
    //Find a user
    const user = await userSchema.findOne({ _id: req.params.userId });
    // const itemInCart = await cartSchema.findOne({ _id: req.body.title});
    // let itemInCart= state.cartItem.findOne({ _id: req.body.id })
    console.log('user',user)
    // console.log('itemInCart',itemInCart)
    // console.log('cartSchema',cartSchema)
  
  
    // to access customer we just send the (user.customer)
     console.log('user',user)
     console.log('userId', req.params.userId)
  
    //Create a product
    const item = new orderSchema();

      let newBody=req.body

    item.title = newBody.title;  
    item.user = user._id;  
    let foundError = ""
  
    await item.save()
    console.log('item after save',item)
  
    user.order.push(item._id);
    console.log('push item._id',item._id)
  
    await user.save()
    console.log('user after save')
  
    if ( !foundError )
      res.send(item);
    else
      res.status(500).send('the error when you try to post the order');
      
  }
  );
  














  
route.post("/payment/methods/create/:userId", async (req, res) => {
    console.log('in create payment route')
    console.log('req',req)
    console.log('req.body',req.body)
  
    // i will send the username by the header, and the id by the body
    // if (req.user) {

        //Find a user
    const user = await userSchema.findOne({ _id: req.params.userId });


    const item = new CustomerSchema();

    console.log('req.user',req.body)
    // let newBody=req.body

    const { id } = req.body;
    item.stripeId = id;  
    item.user = user._id;  


      if (!id) return res.sendStatus(400);
      const { customer } = user.customer;
      console.log('customer',user.customer)
  
      const result = await attachPaymentMethod({
        customer: customer.stripeId,
        id,
      });
      console.log('result in post payment',result)
  
    //   const update = await userSchema.findOneAndUpdate(
    //     { username: req.user.username },
    //     {
    //       $set: { "customer.defaultPaymentId": result.id },
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    //   console.log('update in post payment >>>>> to send it as a response',update)
  
    //   return res.send(update);

    let foundError = ""
  
    await item.save()
    console.log('item after save',item)
  
    user.customer.defaultPaymentId.push(item._id);
    console.log('push item._id',item._id)
  
    await user.save()
    console.log('user after save')
  
    if ( !foundError )
      res.send(item);
    else
      res.status(500).send('the error when you try to post the order');


    // }
    //  else return res.sendStatus(401);
  });
  










  async save(newUser){
    return users.find({username: newUser.username})
    
      .then(async result=>{
        // console.log('result in save',result)
        
        if(!result[0]){
          // console.log('newUser in save - user model',newUser)
          const stripeCustomer = await createStripeCustomer(newUser.username);
          // console.log('stripeCustomer in save - user model',stripeCustomer)

          newUser.password = await bcrypt.hash(newUser.password,5);
          // const stripeCustomer = await createStripeCustomer({ username });
          // console.log('stripeCustomer in save - user model',createStripeCustomer)
          console.log('stripeCustomer in save - user model',stripeCustomer)
           
          console.log('stripeCustomer.id',stripeCustomer.id)
          // customerId= { stripeId: stripeCustomer.id };
          // console.log('customerId in save - user model',customerId)
          
         

          let saveCustomer= new newCustomer( { stripeId: stripeCustomer.id })
          console.log('customer in newUserSave',saveCustomer)
          let afterSaveCustomer = await saveCustomer.save();
          console.log('customer in newUserSave',afterSaveCustomer)

          let newUserSave = new users(newUser);
          console.log('newUserSave in save - user model',newUserSave)

          let final = await newUserSave.save();
          console.log('final that we return in save - user model',final)

          return final;
        }
          return Promise.reject();
        
      });
    
  }