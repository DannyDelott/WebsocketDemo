var fs = require('fs');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var server = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });

var app = express();
var port = 4080;

/* Local Variables */
var pvModel;
var targetImageUrl;
var uploadFilePath;
var uploadFileName;

/* Middleware */
app.use(express.static('./client/public/'));
app.use(bodyParser.json());
app.use(multer({ dest: './server/uploads/' }).single('file'));

/* Routes */

// Perform a check to see if a pending job is underway
app.get('/busy', function(req, res) {
  fs.readdir('./server/uploads/', function(err, files) {
    var response = files.length > 0 ? { isBusy: true } : { isBusy: false };
    res.send(JSON.stringify(response));
  });
});

// Return 200 OK after upload successful
app.post('/upload', function(req, res) {
  pvModel = req.body.model;
  targetImageUrl = req.body.urlToUpload;
  uploadFilePath = req.file.path;
  uploadFileName = req.file.filename;

  // TODO: Run PetaVision here

  res.send(uploadFileName);
});

wss.on('connection', function connection(ws) {

  // close the socket if user didn't pass the right file hash
  if (ws.protocol !== uploadFileName) {
    ws.close();
  }

  ws.on('message', function incoming(message) {
    console.log('server received: %s', message);
    var payload = { nextImage: true };
    ws.send(JSON.stringify(payload));
  });

});

server.on('request', app);
server.listen(port, function () {
  console.log('Listening on ' + server.address().port)
});
