var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

net.createServer(function (socket) {
  console.log('Client has connected to server');

  socket.on(['data', 'client'], function (data) {
    json = JSON.parse(data.toString());
    console.log(json);
  });

  socket.on('close', function (data) {
    console.log('Connection has closed');
  });

}).listen(PORT, HOST);

console.log("Listening on port " + PORT);
