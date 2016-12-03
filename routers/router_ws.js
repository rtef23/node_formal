module.exports = function(app){
	var wsport = 3002;
	var WebSocketServer = require('ws').Server;
	var http = require('http');
	var httpServer = http.createServer(app);
	httpServer.listen(wsport, function(){
		console.info('web socket server listen on %d\n', wsport);
	});
	var ws = new WebSocketServer({server : httpServer});

	ws.on('connection', function(client_ws){
		console.info('websocket connected');
		
		client_ws.send(JSON.stringify({
			message : {
				res : 'welcome to WebSocketServer'
			}
		}));

		client_ws.on('message', function(data, flags){
			var parsed = JSON.parse(data);
			console.log('message from client "%s"\n', parsed.message);

			client_ws.send(JSON.stringify({
				message : {
					yours : parsed.message,
					res : 'Hi, this is text from server'
				}
			}));
		});

		client_ws.on('close', function(client_ws){
			console.info('client leaved');
		});
	});
}