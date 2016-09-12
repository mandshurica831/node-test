
global.get_SQL_Connection = function() {

  var mysql = require('mysql');

  /* ローカル用DB
  var dbConfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'chat_test_160801'
  };
  */
  var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b261359fb916b2',
    password : '61ef1f35',
    database : 'heroku_6722ee1e07d3f4d'
  });

  connection.connect(function(err) {
    if(err) {
      console.log("SQL CONNECT ERROR >> " + err);
      setTimeout(handleDisconnect, 2000);  //接続失敗時リトライ
    } else {
      console.log("SQL CONNECT SUCCESSFUL.");
    }
  });

  //接続切れたとき
  connection.on("close", function (err) {
    console.log("SQL CONNECTION CLOSED >> " + err);
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
  exports = connection;

}

global.get_SQL_Connection();
