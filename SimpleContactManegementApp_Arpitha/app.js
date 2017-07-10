var app = require('express')();
var http = require('http');
var mime = require('mime');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var io = require('socket.io');
var xmldom = require('xmldom').DOMParser;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(favicon(__dirname + '/favicon.ico'));

// Create an instance of http server that listens on TCP port 4000
var server = http.createServer(createServerCallbackHandler).listen(4000, function() {
    console.log('listening on *:4000');
});

// Load all the resources (files) once the server is created 
function createServerCallbackHandler(request, response) {
    var resFilePath = false;
    if (request.url == '/') {
        resFilePath = '/index.html';
    } else {
        resFilePath = request.url;
    }
    var absResPath = './' + resFilePath;
    response.writeHead(200, {
        "Content-Type": mime.lookup(path.basename(absResPath))
    });
    fs.readFile(absResPath, function(err, data) {
        if (err) {
            throw err;
        }
        response.write(data);
        response.end();
    });
}


// Create a socket and make it listen to the server created above
var socket = io.listen(server);

socket.on("connection", handleClient);

// Function to assign event handlers to each new client
function handleClient(client) {
    // Assign event handlers based on the corresponding messages
    client.on("onSave", evtHandlerOnadd);
	client.on("onRead", evtHandlerOnRead);
	
	function evtHandlerOnadd(data)
	{
		console.log('onAddSucess');
		
		fs.writeFile('./contacts.xml', data, 'utf8', function (err, data) {
			if (err) {
				throw(err);
			}
			else{
				client.emit('onSaveSucess');
			}
		});
	}
	
	function evtHandlerOnRead(data)
	{
		console.log('onReadSucess');
		fs.readFile('./contacts.xml', 'utf-8', function (err, data) {
		  if (err) {
			throw err;
		  }
		  else
		  {	
				client.emit('onReadSucess', data);
		  }
		});
	}
	
}
