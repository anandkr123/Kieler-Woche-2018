var connection=require('./connector');
var dbConnection=connection.dbConnection();
//console.log(connection);

exports.eventsAdd=function(params,socket){
    dbConnection.query('INSERT INTO events SET ?',params,function(err,rows){
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
// exports.eventShow=function(params,socket){
//     dbConnection.query('SELECT * FROM `events ?',params,function(err,rows){
//         var recordAdded=false;
//         if(err!=null){
//             console.log(err);
//         }
//         else{
//
//
//         }
//
//     })
// };