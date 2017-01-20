'use strict';

var net = require('net');
var debug = require('debug')('whois:client');
var consts = require('./../config/constants');
var is = require('./is');
var Parser = require('./../libs/parser');

/**
 * Tcp 客户端
 * @param config {HOST: whois.cnnic.cn, PORT: 43} whois 服务器信息
 * @param callback 通信完成后的回调地址
 * @constructor
 */
var Client = function(config, callback) {
    var self = this, data = '';
    self._config = config;
    self._config.HOST = config.HOST || consts.WHOIS_DEFAULT_HOST;
    self._config.PORT = parseInt(config.PORT) || consts.WHOIS_DEFAULT_PORT;


    self._client = net.connect({
        host: self._config.HOST,
        port: self._config.PORT
    }, function() {
        debug('Connect whois server ', self._config.HOST + ':' + self._config.PORT);
        data = '';

        //debug('Send data('+sendData+') to whois server(' + self._config.HOST + ':' + self._config.PORT + ')');
        //self._client.write(sendData);
    });

    //self._client.setEncoding('utf-8');

    self._client.on('data', function(chunk) {
        data += chunk;
    });

    self._client.on('error', function(err) {
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' is error', err);
        callback(self, err);
    });

    self._client.on('end', function() {
        //debug('domain whois info:\n', data);
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' is end', data);
        var err = is.empty(data) || !Parser.isValid(self._config, data) ? new Error('Not found whois info') : null;
        callback(self, err, data);
    });
};
/**
 * 发送消息
 * @param data
 */
Client.prototype.send = function(data){
    var sendData = this._config.PARAM.replace('$', data) + "\r\n";
    debug('Send data('+sendData+') to whois server(' + this._config.HOST + ':' + this._config.PORT + ')');
    this._client.write(sendData);
};
/**
 * 销毁该连接
 */
Client.prototype.destroy = function(){
    debug('Destroy whois server(' + this._config.HOST + ':' + this._config.PORT + ')');
    this._client.destroy();
};
Client.prototype.getConfig = function(){
    return this._config;
};

module.exports = Client;

