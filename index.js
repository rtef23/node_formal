var express = require('express');
var app = express();
var port = 3001;
var path = require('path');
var body_parser = require('body-parser');

var router_templates = require('./routers/router_template');
var router_user = require('./routers/router_user');
var router_image = require('./routers/router_image');
var router_ws = require('./routers/router_ws');
var router_person = require('./routers/router_person');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));
/*
	to process HTTP method 'PUT', 'DELETE'
*/
var methodOverride = require('method-override');

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

var server = app.listen(port, function(){
	console.log('server port : %s', server.address().port);
});

//routers
app.use('/', router_templates);
app.use('/user', router_user);
app.use('/image', router_image);
app.use('/persons', router_person);

//for websocket
require('./routers/router_ws')(app);