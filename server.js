var nssocket = require('nssocket');

var server = nssocket.createServer(function (socket) {

  console.log("Opening connection to server");
  socket.send('connected');

  socket.data('xboxEvent', function (data) {
    // data == data from client (xbox controller)
    console.dir(data);
    // send input to phone
  });

  socket.on('close', function () {
    console.log("Closing connection - server");
  });

});

server.listen(6785);
