'use strict';

var util = require('util');
var Events = require('./../libs/events');
var consts = require('./../config/constants');
var debug = require('debug')('whois:client_pool');

/**
 * Tcp 客户端连接池
 * @param options
 * @constructor
 */
var ClientPool = function(options) {
    if (!(this instanceof ClientPool)) return new ClientPool(arguments[0], arguments[1]);
    Events.call(this);

    this._options = Object.assign({
        timeout: consts.TIME_OUT_MS   //超时20秒后超时
    }, options);
};

util.inherits(ClientPool, Events);

ClientPool.prototype._clients = [];

ClientPool.prototype.init = function(configs) {
    debug('Init');
    this._clients = [];
    var self = this;
    for(var i in configs){
        var Client = require('./../libs/client.js');
        var client = new Client(configs[i]);
        client.onSuccess(function(client, data){
            debug('client.onSuccess Got data ...');
            self.emit('onClientSuccess', client, data);
        });
        client.onError(function(client, err){
            debug('client.onError ', err);
            self.emit('onClientError', client, err);
            self.remove(client);
            if(!self._clients || self._clients.length <= 0){
                self.emit('onError', client, err);
            }
        });
        this._clients.push(client);
    }
    //设置超时
    setTimeout(function(){
        debug('Time out');
        self.removeAll();
        self.emit('onTimeout', null, {message: 'ETIMEDOUT'});
    }, this._options.timeout);
};

/**
 * 客户端获取信息成功事件
 * @param fn
 */
ClientPool.prototype.onClientSuccess = function(fn) {
    this.once('onClientSuccess', fn);
};
/**
 * 客户端获取信息失败事件
 * @param fn
 */
ClientPool.prototype.onClientError = function(fn) {
    this.once('onClientError', fn);
};

/**
 * 所有客户端获取信息失败事件
 * @param fn
 */
ClientPool.prototype.onError = function(fn) {
    this.once('onError', fn);
};

/**
 * 通信超时事件
 * @param fn
 */
ClientPool.prototype.onTimeout = function(fn) {
    this.once('onTimeout', fn);
};

/**
 * 从连接池中删除一个连接，并且销毁该连接
 * @param client
 */
ClientPool.prototype.remove = function(client){
    var index = this._clients.indexOf(client);
    if (index > -1) {
        this._clients[index].destroy();
        this._clients.splice(index, 1);
    }
};
/**
 * 清空连接池， 销毁所有连接
 */
ClientPool.prototype.removeAll = function(){
    debug('Remove all client ' + this._clients.length);
    for(var index in this._clients){
        this._clients[index].destroy();
    }
    this._clients = [];
};
/**
 * 向所有客户端发送消息
 * @param data
 */
ClientPool.prototype.send = function(data){
    for(var index in this._clients){
        this._clients[index].send(data);
    }
};

module.exports = ClientPool;
