var express = require('express');
var router = express.Router();

module.exports = router;

//rest Create
router.post('', function(req, res){

});

//rest Read
router.get('', function(req, res){
	res.render('../views/main');
});
router.get('/template/:target', function(req, res){
	switch(req.params.target){
		case 'user':
		{
			res.render('../views/user/user');
		}
		break;
		case 'image':
		{
			res.render('../views/image/image');
		}
		break;
		case 'ws':
		{
			res.render('../views/ws/ws_form');
		}
		break;
		case 'db':
		{
			res.render('../views/db/db_main');
		}
		break;
		default : 
		{
			res.writeHead(404);
			res.end('No Page Detected');
		}
		break;
	}
});
router.get('/template/:target1/:target2', function(req, res){
	switch(req.params.target1){
		case'db':
		{
			switch(req.params.target2){
				case 'person':
				{
					res.render('../views/db/person/person');
				}
				break;
				default:
				{
					res.writeHead(404);
					res.end('No Page Detected');
				}
				break;
			}
		}
		break;
	}
});

//rest Update
router.put('', function(req, res){

});

//rest Delete
router.delete('', function(req, res){

});