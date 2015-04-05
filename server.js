var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var phoneActive = null;

net.createServer(function (socket) {
  socket.on('data', function (data) {
    var json = JSON.parse(data.toString());
    // data will be either P or C
    if (json['clientType'] == "c") {
      console.log('Server has heard from client');
      // if phone connection is active
      if (phoneActive != null) {
        // client is client, push data to open phone connection
        console.log("phone is connected");
        phoneActive.write(data);
      }
    } else if (json['clientType'] == "p") {
      console.log('Server has heard from phone');
      // client is a phone, set phone var to socket
      phoneActive = socket;
    }
  });

  socket.on('close', function(data) {
    // if socket is phone, unset phone var
    if (socket == phoneActive) {
      phoneActive = null;
      console.log("Closing connection to phone..");
    } else {
      console.log("Closing connection to client..");
    }
  });
}).listen(PORT, HOST);

console.log("Listening on port " + PORT);
