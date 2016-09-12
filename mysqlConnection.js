var mysql = require('mysql');

var connection;

global.get_SQL_Connection = function() {

  connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b261359fb916b2',
    password : '61ef1f35',
    database : 'heroku_6722ee1e07d3f4d'
  });

  //接続時
  connection.connect(function(err) {
    if(err) {
      console.log("SQL CONNECT ERROR >> " + err);
      setTimeout(global.get_SQL_Connection, 2000);  //接続失敗時リトライ
    } else {
      console.log("SQL CONNECT SUCCESSFUL.");
    }
  });

  //エラーのとき
  connection.on('error', function(err) {
    console.log("SQL CONNECTION ERROR >> " + err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('=> RECONECT...');
      //再接続
      global.get_SQL_Connection();
    } else {
      throw err;
    }
  });

}
  global.get_SQL_Connection();
  module.exports = connection;
