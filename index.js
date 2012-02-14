var util = require('util');
var net = require('net');
var Socket = net.Socket;

var Nitro = function() {
    this.host = 'localhost';
    this.port = 7116;
    Socket.call(this);
    this.setEncoding('utf8');
    this.connected = false;
    var socket = this;
    this.on('data', function(data) {
      pdata = JSON.parse(data);
      var msgtype = Object.keys(pdata)[0];
      var body = pdata[msgtype];
      //console.log("Got " + data);
      //console.log(msgtype + ":");
      //console.log(pdata[msgtype]);
      switch(msgtype) {
        case 'auth': 
          if (body['return'] == 3 || body['return'] == 4)
            socket.emit('authenticated');
          else
            socket.emit('error');
        break;
        case 'register':
          if (body['return'] == 3)
            socket.emit('registered');
          else
            socket.emit('error');
        break;
        default:
          socket.emit('error');
        break;

      }
    });
};

util.inherits(Nitro, Socket);

Nitro.prototype.request = function(data) {
  this.write(JSON.stringify(data));
};

Nitro.prototype.auth = function(username, password) {
  var params = {"username": username, "password": password};
  this.request({"auth": params});
};

Nitro.prototype.register = function(username, password) {
  var params = {"username": username, "password": password};
  this.request({"register": params});
};

module.exports = Nitro;
