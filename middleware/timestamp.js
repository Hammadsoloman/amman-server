'use strict';

module.exports = {
  requestTime: (req,res,next) =>{
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    req.full_time = `date: ${date} and time: ${time}`;
    next();
  },
};