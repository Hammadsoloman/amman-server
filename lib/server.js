'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
// require middleware
// const timeStam = require('../middleware/timestamp');
const logReq = require('../middleware/logger');
const notFound = require('../middleware/404');
const errorHandler = require('../middleware/500');
const api = require('../routes/router');
// const expressValidator = require('express-validator');
const handleErrors = require('../middleware/handleErrors');

const { createSubscription } = require("../utils/utils");




app.use(express.json());
app.use(cors());
//use middleware
app.use(logReq);


app.use('', api);



// Error Function
app.use('*',notFound);
app.use(errorHandler);

app.use(handleErrors);


// // Express Validator Middleware
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
//       var namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;
  
//       while (namespace.length) {
//         formParam += '[' + namespace.shift() + ']';
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value
//       };
//     }
//   }));



module.exports = {
  server: app,  
  start: ()=>{
    const PORT = process.env.PORT || 3100;
    app.listen(PORT,()=>{
      console.log(`Listen on Port ${PORT}`);
    });
  },
};