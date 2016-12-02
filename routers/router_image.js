var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var path = require('path');

module.exports = router;

var storage = multer.diskStorage({
	destination : function (req, file, cb) {
		cb(null, path.join(__dirname, '../image/'));
	},
	filename : function (req, file, cb) {
		file.uploadFile = {
			name : req.params.filename.replace('.' + file.mimetype.split('/')[1], ''),
			ext : file.mimetype.split('/')[1]
		};
		cb(null, file.uploadFile.name + '.' + file.uploadFile.ext);
	}
});
var upload = multer({storage : storage}).single('image-file');

//Create
router.post('/:filename', function(req, res){
	console.log(JSON.stringify(req.params));
	upload(req, res, function(err){
		if(err){
			res.writeHead(500);
			res.end();
			return;
		}
		res.redirect('/template/image');
	});
});

//Read
router.get('/:filename', function(req, res){
	var file_name = req.params.filename;
	var total_path = path.join(__dirname, '../image/', file_name);
	var ext = path.extname(file_name).replace(".", '');
	console.log('ext : %s\n', ext);
	fs.readFile(total_path, function(err, data){
		if(err){
			res.writeHead(500);
			res.end('there is no image');
		}
		res.writeHead(200, {'Content-Type' : 'image/' + ext});
		res.end(data, 'binary')
	});
});

//Update
router.put('/:filename', function(req, res){
	var file_name = req.params.filename;
	console.log('file_name : %s\n', file_name);
});

//Delete
router.delete('/:filename', function(req, res){
	var file_name = req.params.filename;
	console.log('file_name : %s\n', file_name);
});