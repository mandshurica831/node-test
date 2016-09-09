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

var connection = mysql.createConnection(dbConfig);

connection.on('error', function(err) { //エラー受け取るコールバック
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') {
    module.exports = connection;
  } else {
    throw err;
  }
});

module.exports = connection;
