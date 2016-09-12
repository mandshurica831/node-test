


var app = require("express")();
var mysql = require("mysql");

var express = require("express");

var dbData = {
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'b261359fb916b2',
  password : '61ef1f35',
  database : 'heroku_6722ee1e07d3f4d'
};

module.exports = {

    connection: null,

    connect: function() {
        this.connection = mysql.createConnection(dbData);
        this.connection.connect();
    },

    errorHandler: function(err) {
        if (err) {
            throw new Error(err);
        }
    },

    query: function(query, params, callback) {
        this.connection.query(query, params, callback);
    },

    getOne: function(query, params, callback) {
        var self = this;
        this.query(query, params, function(err, rows) {
            self.errorHandler(err);
            callback(rows.length < 1 ? null : rows[0]);
        });
    },

    getAll: function(query, params, callback) {
        var self = this;
        this.query(query, params, function(err, rows) {
            self.errorHandler(err);
            callback(rows);
        });
    },

    insert: function(table, data, callback) {
        var self = this;
        var query = "insert into " + table + " set ?";
        this.query(query, data, function(err, result, fields) {
            self.errorHandler(err);
            callback(result.insertId);
        });
    },

    update: function(table, data, id, callback) {
        var fields = "",
            params = [];
        for (var k in data) {
            fields += k + " = ?,";
            params.push(data[k]);
        }

        fields = fields.substr(0, fields.length - 1);
        params.push(id);

        var self = this;
        var query = "update " + table + " set " + fields + " where id = ?";

        this.query(query, params, function(err, result) {
            self.errorHandler(err);
            callback(result);
        });
    }
};

module.exports.connect();
