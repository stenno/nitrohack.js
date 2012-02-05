var util = require('util');
var net = require('net');
var Socket = net.Socket;

var nitro = function() {
    this.host = 'localhost';
    this.port = 7115;
    Socket.call(this);
    this.setEncoding('utf8');
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

nitro.prototype.auth = function(username, password) {
  var socket = this;
  var cmd = {"auth":{"username": username, "password": password}};
  this.connect(this.port, this.host, function() {
    socket.write(JSON.stringify(cmd));  
  });
};

nitro.prototype.register = function(username, password) {
  var socket = this;
  var cmd = {"register":{"username": username, "password": password}};
  this.connect(this.port, this.host, function() {
    socket.write(JSON.stringify(cmd));
  })
}

module.exports = nitro;
