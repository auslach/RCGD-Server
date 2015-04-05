var net = require('net');

var HOST = 'rcgd.cloudapp.net';
var PORT = 6969;

var client = new net.Socket();

client.connect(PORT, HOST, function () {
  var data = { id: 'L', val: 32000, clientType: "c" };
  var json = JSON.stringify(data);
  client.write(json);

});

