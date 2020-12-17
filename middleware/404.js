'use strict';

function notFound(req,res){
  res.status(404).send('Error 404, This Page Not Found');
}
module.exports = notFound;