var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();

client.connect(PORT, HOST, function () {
  var data = { connected: true, clientType: "p" };
  var json = JSON.stringify(data);
  client.write(json);

  // test, kill phone connection after 5 sec
  setTimeout(function () {
    client.destroy();
  }, 5000);
});

