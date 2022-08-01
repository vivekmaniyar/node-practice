var mysql = require('mysql');
const promise = require('util');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'empdb'
});

module.exports = connection;