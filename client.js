var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();

client.connect(PORT, HOST, function () {
  xboxEventResult = {id: 'L', val: 32000};

  var json = JSON.stringify(xboxEventResult);
  client.write(json);

  setTimeout(function () {
    client.destroy();
  }, 1000);
});

