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
      console.log("got msgtype " + msgtype)
      switch(msgtype) {
        case 'auth': 
          socket.emit('authenticated');
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

module.exports = nitro;
