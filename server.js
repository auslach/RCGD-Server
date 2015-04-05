var net = require('net');

var HOST = '0.0.0.0';
var PORT = 6969;
var phoneActive = null;

net.createServer(function (socket) {

  var dataBuffer = "";

  function processDataBuffer(){

    var dataItems = dataBuffer.toString().split('\n')

    if(dataItems.length >= 2){
      //we have a processable data item
      for(var i = 0; i < dataItems.length - 1; ++i){
        json = JSON.parse(dataItems[i].toString())
        console.log(json.toString())
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
      }
    }
  }

  socket.on('data', function (data) {
    //console.log(data);

    dataBuffer += data
    processDataBuffer();
    
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

  socket.on('error', function(data){
    console.log("ERRORS MOTHERFUCKER!!!!");
    console.log(data);
  });

}).listen(PORT, HOST);

console.log("Listening on host " + HOST + " & port " + PORT);
