var mysql = require('mysql');

/*
var dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'chat_test_160801'
};
*/

//Heroku
var dbConfig = {
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'b261359fb916b2',
  password : '61ef1f35',
  database : 'heroku_6722ee1e07d3f4d'
};

//var connection = mysql.createConnection(dbConfig);


var connection; //クライアントオブジェクト

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);  //接続失敗時リトライ
    }
  });

  connection.on('error', function(err) { //エラー受け取るコールバック
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();    //再度接続
      module.exports = connection;
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
