var Promise = require('promise');

var getConn = function(){
	var db_info = require('./db_info.json');
	var mysql = require('mysql');
	var conn = mysql.createConnection(db_info);

	conn.connect(function(err){
		if(err){
			console.error("mysql connection error");
			console.error(err);
			return null;
		}
	});
	return conn;
};

exports.executeQuery = function(q, data){
	return new Promise(function(resolved,rejected){
		var conn = getConn();

		if(!conn){
			return rejected('connection fail');
		}

		conn.query(q, data, function(err, rows){
			conn.end();
			if(err){
				return rejected(err);
			}
			return resolved(rows);
		});
	});
};