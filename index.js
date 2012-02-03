var util = require('util');
var net = require('net');
var Socket = net.Socket;

var nitro = function() {
    this.host = 'localhost';
    this.port = 7115;
    Socket.call(this);
    this.setEncoding('utf8');
    this.on('data') = function(data) {
      pdata = JSON.parse(data);
      data("");
    }
};

util.inherits(nitro, Socket);

nitro.prototype.auth = function(username, password) {
  var socket = this;
  var cmd = {"auth":{"username": username, "password": password}};
  this.connect(this.port, this.host, function() {
    socket.write(JSON.stringify(cmd));  
  });
};

module.exports = nitro;