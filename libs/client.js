'use strict';

var util = require('util');
var net = require('net');
var Logger = require('./log4js');
var Events = require('./../libs/events');
var debug = require('debug')('whois:client');
var consts = require('./../config/constants');
var is = require('./is');
var Parser = require('./../libs/parser');

//logger.info('Connect whois server ');
/**
 * Tcp 客户端
 * @param config {HOST: whois.cnnic.cn, PORT: 43} whois 服务器信息
 * @constructor
 */
var Client = function(config) {
    var logger = new Logger('Client');
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
        data = '';
    });

    self._client.once('data', function(chunk) {
        debug('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' Got Data');
        data += chunk;
    });

    self._client.once('error', function(err) {
        logger.info('Whois server ' + self._config.HOST + ':' + self._config.PORT + ' get error ', err);
        self.emit('onError', self, err);
    });

    self._client.once('end', function() {
        logger.info('Whois server ', self._config.HOST + ':' + self._config.PORT + ' get data ', data);
        var err = is.empty(data) ? new Error('Not found whois info') : null;
        if(Parser.judgeIsRoot(self._config, data) && !Parser.isValid(self._config, data)){
            err = data;
        }
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
    var logger = new Logger('Client');
    var sendData = this._config.PARAM.replace('$', data) + "\r\n";
    logger.info('Send data('+sendData+') to whois server(' + this._config.HOST + ':' + this._config.PORT + ')');
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

