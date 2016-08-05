var mysql = require('mysql');

var dbConfig = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'chat_test_160801'
};

var connection = mysql.createConnection(dbConfig);

module.exports = connection;
