var express = require('express');
var router = express.Router();
var person = require('../DB/db_person');

module.exports = router;

//rest Create
router.post('', function(req, res){
	console.log('body : %s\n', JSON.stringify(req.body));
	if(!req.body.id || !req.body.name){
		res.writeHead(400);
		res.end('Bad Request');
	}

	person.create(req.body).then(function(result){
		console.log('create user success');
		res.redirect('/template/db/person');
	}, function(err){
		console.log(err.errno);
		switch(err.errno){
			case 1062:
			{
				res.writeHead(400);
				res.end('Already exist User ID');
			}
			break;
			default:
			{
				res.writeHead(500);
				res.end('Internal Server Error');
			}
			break;
		}
	});
	//res.writeHead(400);
	//res.end('Bad request');
});

//rest Read
router.get('', function(req, res){
	person.read().then(function(result){
		//console.log(JSON.stringify(result));
		res.json(result);
	}, function(err){
		console.log(err);
	});
});

//rest Update
router.put('', function(req, res){
	console.log('PUT called');
	res.json({hi : 'hi PUT'});
});

//rest Delete
router.delete('', function(req, res){
	console.log('DELETE called');
	res.json({hi : 'hi DELETE'});
});