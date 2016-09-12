var express = require('express');
var connection = require('mysqlConnection');

connection.query('SHOW TABLES', function(err, rows) {
  if(err) console.log('ERROR',err);
  console.log('rows',rows);
});
