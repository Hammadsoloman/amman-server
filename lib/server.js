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
app.use(express.json());
app.use(cors());
//use middleware
app.use(logReq);


app.use('', api);



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