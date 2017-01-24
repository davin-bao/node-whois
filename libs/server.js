'use strict';

var net = require('net');
var debug = require('debug')('whois:server');


var Server = function(callback) {
    var self = this;
    self._server = net.createServer();
    self._clientList = [];
    self._server.on('connection', function (client) {
        self._clientList.push(client);
        var buffers = '';
        client.on('data', function(data) {
            if(data.readUInt8() == 13) {
                try{
                    var domain = '', refresh = false;
                    var params = buffers.split('&');
                    if(params.length == 1){
                        domain = params[0];
                    }else if(params.length >= 2){
                        domain = params[0], refresh = params[1];
                    }
                    callback(client, domain, refresh);
                }catch (e){
                    client.write(e.message.toString('UTF-8'));
                    client.end();
                }
            }
            buffers += data.toString('UTF-8');
        });
        client.on('end', function() {
            self._clientList.splice(self._clientList.indexOf(client), 1);
        });
    });

    self._server.listen(43);
    debug('listening 43');
};

module.exports = Server;