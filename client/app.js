var ws = new WebSocket('ws://localhost:4080', 'echo-protocol');

function sendMessage(){
  var message = 'asdf';
  ws.send(message);
}

sendMessage();
