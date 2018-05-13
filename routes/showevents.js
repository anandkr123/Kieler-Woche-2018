var express = require('express');
var router = express.Router();



exports.list = function(req, res){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM events',function(err,rows){
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('showevents',{page_title:"Events in kiel",data:rows});
        });
    });
}
