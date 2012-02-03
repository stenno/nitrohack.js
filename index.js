var util = require('util');
var net = require('net');
var Socket = net.Socket;

var nitro = function() {
    this.host = 'localhost';
    this.port = 7115;
    Socket.call(this);
};

util.inherits(nitro, Socket);


nitro.prototype.auth = function() {
};

module.exports = nitro;
