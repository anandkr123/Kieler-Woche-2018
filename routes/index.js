var express = require('express');
var router = express.Router();
//var http=require('http');

//var usersModel =require('../models/users_model');// importing the model for db connection
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

router.put('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



 //var io_signin=require('socket.io')(http);
// io_signup.on('connection',function(socket,req,res){
//     socket.on('emit_signup_text',function(params){
//         usersModel.usersAdd(params,socket);
//         alert('successfully create the user account');
//     });
// });




module.exports = router;
