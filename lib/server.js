'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// require middleware
// const timeStam = require('../middleware/timestamp');
const logReq = require('../middleware/logger');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const api = require('../routes/router');
const paymentApi=require("../routes/paymentRoutes")
const configureRoutes = require("../routes/paymentRoutes")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//use middleware
app.use(logReq);
configureRoutes(app);

app.post('/pay', async (req, res) => {
  const {email} = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: 'usd',
      // Verify your integration in this guide by including this parameter
      metadata: {integration_check: 'accept_a_payment'},
      receipt_email: email,
    });

    res.json({'client_secret': paymentIntent['client_secret']})
})



app.use(api);
app.use(paymentApi);

// Error Function
app.use('*',notFound);
app.use(errorHandler);



module.exports = {
  server: app,  
  start: ()=>{
    const PORT = process.env.PORT || 3100;
    app.listen(PORT,()=>{
      console.log(`Listen on Port ${PORT}`);
    });
  },
};