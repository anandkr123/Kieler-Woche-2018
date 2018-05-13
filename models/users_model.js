var express = require('express');
var router = express.Router();



var connection=require('./connector');
var dbConnection=connection.dbConnection();
//console.log(connection);

exports.usersAdd=function(params,socket){
    dbConnection.query('INSERT INTO users SET ?',params,function(err,rows){
        var recordAdded=false;
        if(err!=null){
            console.log(err);
        }
        else{
            if(rows['affectedRows'] === 1){
                recordAdded=true;
            }

        }

    })
};

exports.login=function(params,socket) {
dbConnection.query('SELECT * FROM `users` WHERE username= ?', params.username, function (err,rows) {
        var loginSuccess = false;
        var pwd = params.password;
        if(err!=null){

            console.log(err);

        }

        if (rows.length > 0) {
            if (pwd == rows[0].password) {
                console.log('login success');

                // io.on('conn',function(socket){
                //
                //         socket.emit('loginSuccess'," Login Successful ");
                //     });
            }
            else
            {console.log("Login Not successfull");}
        }
    });
}

