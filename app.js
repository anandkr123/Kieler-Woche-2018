var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var myConnection = require('express-myconnection');

var app = express();
app.use(
    myConnection(mysql,{
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'event'
    },'pool')
);




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter =require('./routes/home');
var serveStatic = require('serve-static')

app.use(serveStatic('parent-folder-of-images-folder/'))

var chatRouter=require('./routes/chats');
var eventRouter=require('./routes/events');
var showevents=require('./routes/showevents');
var aboutRouter =require('./routes/about');
// var app = express();

var usersModel =require('./models/users_model');           // importing the model for db connection
var eventsModel =require('./models/events_model');         // importing the model for db connection


var http=require('http').Server(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/chats',chatRouter);
app.use('/home',homeRouter);
app.use('/about',aboutRouter);
app.use('/events',eventRouter);
app.use('/users',usersRouter);



//app.use('/showevents', showevents);
//app.get('/users', usersRouter.list);
app.get('/showevents', showevents.list);


//app.use(app.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//

global.io=require('socket.io')(http);
io.on('connection',function (socket) {
   // console.log('socket established');
    socket.on('join', function (data) {
        console.log(data);
    });
});



io.on('connection', function(socket) {
    console.log('Client connected...');

    socket.on('join', function(data) {
        console.log(data);
    });

    socket.on('messages', function(data){
        socket.emit('thread', data);
        socket.broadcast.emit('thread', data);
    });
});
io.on('connection',function(socket){
    console.log("database event userAdd");
    socket.on('emit_signup_text',function(params){
        usersModel.usersAdd(params,socket);
        var u=params.username;
        socket.emit('useradded',u);
    });
});

io.on('connection',function(socket){
    console.log("database event eventAdd");
    socket.on('emit_events_text',function(params){
        eventsModel.eventsAdd(params,socket);

        socket.emit('eventadded',"event added successfully");
    });
});

io.on('connection',function(socket) {
    socket.on('emit_signin_text', function (params) {
        usersModel.login(params, socket);
        var user_name=params.username;
        socket.emit('login',user_name);
    });
});

// var reply={
//     sender: 'server',
//     time: Date.now()
// }
//
// var io=require('socket.io')(http);
// io.on('connection',function(socket) {
//     socket.on('example', function (Message_Server) {
//         console.log(Message_Server);
//         socket.emit("message_from_server", reply);
//     });
// });
//
//var io_signup=require('socket.io')(http);

http.listen(3000,function() {
    console.log('listenting to the port');
});
//




module.exports = app;
