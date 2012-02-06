var util = require('util');
var net = require('net');
var Socket = net.Socket;

var nitro = function() {
    this.host = 'localhost';
    this.port = 7115;
    Socket.call(this);
    this.setEncoding('utf8');
    this.connected = false;
    var socket = this;
    this.on('data', function(data) {
      pdata = JSON.parse(data);
      var msgtype = Object.keys(pdata)[0];
      //console.log(msgtype + ":");
      //console.log(pdata[msgtype]);
      switch(msgtype) {
        case 'auth': 
          if (pdata.return == 4)
            socket.emit('authenticated');
          else
            socket.emit('error');
        break;
        case 'register':
          if (pdata.return == 0)
            socket.emit('registered');
          else
            socket.emit('error')
        break;
        default:
          socket.emit('error');
        break;

      }
    });
};

util.inherits(nitro, Socket);

nitro.prototype.request = function(msgtype, params) {
  if (this.connected)
    this.write(JSON.stringify({msgtype: params}));
  else {
    var socket = this;
    this.connect(this.port, this.host, function() {
      socket.connected = true;
      socket.write(JSON.stringify({msgtype: params}));
    })
  }
};

nitro.prototype.auth = function(username, password) {
  var msgtype = "auth";
  var params = {"username": username, "password": password};
  this.request(msgtype, params);
};

nitro.prototype.register = function(username, password) {
  var msgtype = "register";
  var params = {"username": username, "password": password};
  this.request(msgtype, params);
};

module.exports = nitro;
