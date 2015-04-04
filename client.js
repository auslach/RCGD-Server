var nssocket = require('nssocket');

var outbound = new nssocket.NsSocket();

outbound.data('connected', function () {
  // example JSON from xbox controller
  outbound.send('xboxEvent', { id: 'L', val: 32000 });
  outbound.end();
});

outbound.connect(6785);
