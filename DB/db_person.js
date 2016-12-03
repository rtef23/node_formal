var db = require('./db_conn');

exports.create = function(form){
	/*
	form
	{
		id : d1,
		name : d2
	}
	*/
	if(!form.id || !form.name)
		return new Promise(function(resolved, rejected){
			return rejected('input form is not valid');
		});
	var q = 'insert into person set ?';
	return db.executeQuery(q, form);
};
exports.read_byId = function(form){
	/*
	form
	{
		id : d1
	}
	*/
	if(!form.id)
		return new Promise(function(resolved, rejected){
			return rejected('input form is not valid');
		});
	var q = 'select * from person where id=?';
	return db.executeQuery(q, [form.id]);
};
exports.read_byName = function(form){
	/*
	form
	{
		name : d1
	}
	*/
	if(!form.name)
		return new Promise(function(resolved, rejected){
			return rejected('input form is not valid');
		});
	var q = 'select * from person where name=?';
	return db.executeQuery(q, [form.name]);
};
exports.read = function(){
	var q = 'select * from person';
	return db.executeQuery(q);
};