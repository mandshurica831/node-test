var mysql = require('mysql');

/*
var dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'chat_test_160801'
};
*/
var db_config = {
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'b261359fb916b2',
  password : '61ef1f35',
  database : 'heroku_6722ee1e07d3f4d'
};
var connection; //クライアントオブジェクト

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

  connection.connect(function(err) {
    if(err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);  //接続失敗時リトライ
    }
  });

  connection.on('error', function(err) { //エラー受け取るコールバック
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('== CONECT ==');
      handleDisconnect();    //再度接続
    } else {
      throw err;
    }
  });
  module.exports = connection;
  module.exports.getConnection();
  return connection;
}

handleDisconnect();

/*
module.exports.getConnection = function() {
    // Test connection health before returning it to caller.
    if ((module.exports.connection) && (module.exports.connection._socket)
            && (module.exports.connection._socket.readable)
            && (module.exports.connection._socket.writable)) {
        return module.exports.connection;
    }
    console.log(((module.exports.connection) ?
            "UNHEALTHY SQL CONNECTION; RE" : "") + "CONNECTING TO SQL.");
    var connection = mysql.createConnection({
        host     : 'us-cdbr-iron-east-04.cleardb.net',
        user     : 'b261359fb916b2',
        password : '61ef1f35',
        database : 'heroku_6722ee1e07d3f4d'
    });
    connection.connect(function(err) {
        if (err) {
            console.log("SQL CONNECT ERROR: " + err);
        } else {
            console.log("SQL CONNECT SUCCESSFUL.");
        }
    });
    connection.on("close", function (err) {
        console.log("SQL CONNECTION CLOSED.");
    });
    connection.on("error", function (err) {
        console.log("SQL CONNECTION ERROR: " + err);
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host     : 'us-cdbr-iron-east-04.cleardb.net',
            user     : 'b261359fb916b2',
            password : '61ef1f35',
            database : 'heroku_6722ee1e07d3f4d'
        });
    });
    module.exports = connection;

    return connection;

}
// Open a connection automatically at app startup.
module.exports.getConnection();
// If you've saved this file as database.js, then get and use the
// connection as in the following example:
// var database = require(__dirname + "/database");
// var connection = database.getConnection();
// connection.query(query, function(err, results) { ....
*/
