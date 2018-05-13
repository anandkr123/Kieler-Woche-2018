var dbconnection = function(){
    var mysql = require('mysql');
    var sql = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'event'
    });
    sql.connect(function(err){
        if(err!=null){
            console.log(err);
        }
        else{
            console.log("succesfull db connection");
        }
    });
    return sql
};
exports.dbConnection = dbconnection;