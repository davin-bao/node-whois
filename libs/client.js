'use strict';

var util = require('util');
var net = require('net');
var Events = require('./../libs/events');
var debug = require('debug')('whois:client');
var consts = require('./../config/constants');
var is = require('./is');
var Parser = require('./../libs/parser');

/**
 * Tcp 客户端
 * @param config {HOST: whois.cnnic.cn, PORT: 43} whois 服务器信息
 * @constructor
 */
var Client = function(config) {
    if (!(this instanceof Client)) return new Client(arguments[0], arguments[1]);
    Events.call(this);

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
    });

    self._client.once('data', function(chunk) {
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' Got Data');
        data += chunk;
    });

    self._client.once('error', function(err) {
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' is error', err);
        self.emit('onError', self, err);
    });

    self._client.once('end', function() {
        //debug('domain whois info:\n', data);
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' is end', data);
        var err = is.empty(data) || (Parser.judgeIsRoot(self._config, data) && !Parser.isValid(self._config, data)) ? new Error('Not found whois info') : null;
        if(err) {
            self.emit('onError', self, err);
        }else{
            self.emit('onSuccess', self, data);
        }
    });
};

util.inherits(Client, Events);
/**
 * 成功获取信息事件
 * @param fn, 参数： self, data
 */
Client.prototype.onSuccess = function(fn){
    var self = this;
    self.once('onSuccess', fn);
};
/**
 * 获取失败信息事件
 * @param fn, 参数： self, err
 */
Client.prototype.onError = function(fn){
    var self = this;
    this.once('onError', fn);
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

