var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('users', { title: 'Express' });
});

module.exports = router;




// exports.list = function(req, res){
//     req.getConnection(function(err,connection){
//         var query = connection.query('SELECT * FROM events',function(err,rows){
//             if(err)
//                 console.log("Error Selecting : %s ",err );
//
//             res.render('showevents',{page_title:"Events in kiel",data:rows});
//         });
//     });
// }