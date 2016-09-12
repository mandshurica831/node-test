module.exports.get_SQL_Connection = function() {

  var mysql = require('mysql');

  /* ローカル用DB
  var dbConfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'chat_test_160801'
  };
  */
  var dbData = {
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b261359fb916b2',
    password : '61ef1f35',
    database : 'heroku_6722ee1e07d3f4d'
  };
  var connection = mysql.createConnection(dbData);

  connection.connect(function(err) {
    if(err) {
      console.log("SQL CONNECT ERROR >> " + err);
      setTimeout(handleDisconnect, 2000);  //接続失敗時リトライ
    } else {
      console.log("SQL CONNECT SUCCESSFUL.");
    }
  });

  //エラーのとき
  connection.on('error', function(err) {
    console.log("SQL CONNECTION ERROR >> " + err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('=> RECONECT...');
        module.exports.get_SQL_Connection();
      } else {
        throw err;
      }
    });
    
}

module.exports.get_SQL_Connection();
