var express = require('express');
var router = express.Router();

module.exports = router;

//Create
router.post('', function(req, res){
	console.log(req.body);

	req.accepts('json');
	var id = req.body['user-id'];
	var name = req.body['user-name'];

	console.log('id : %s\tname : %s\n', id, typeof name);

	//render('absolute path from router file', [data])
	res.render('../views/user/user-info', {
		user:{
			id : id,
			name : name
		}
	});
});

//Read
router.get('', function(req, res){
	console.log('user read occur');

	console.log(req.body);
	res.json(200, {id : 'id1', name : 'name1'});
});

//Update
router.put('', function(req, res){
	console.log('user update occur');
	console.log('ID : %s\tName : %s\n', req.body['user-id'], req.body['user-name']);
	res.redirect('/template/user');
});

//Delete
router.delete('', function(req, res){
	console.log('user delete occur');
	res.redirect('/template/user');
});