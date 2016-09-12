
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
        module.exports = global.get_SQL_Connection();
      } else {
        throw err;
      }
    });

  var query = 'SELECT B.board_id, B.user_id, B.title, ifnull(U.user_name, \'名無し\') AS user_name, DATE_FORMAT(B.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards B LEFT OUTER JOIN users U ON B.user_id = U.user_id ORDER BY B.created_at DESC';
  connection.query(query, function(err, rows) {
    console.log("========= mysqlConnection.js <44> =========");
    console.log("==> module");
    console.log(module.exports);
    console.log("====================================");
  });
  return connection;
}

module.exports = global.get_SQL_Connection();
