'use strict';

var consts = require('./../config/constants');
var debug = require('debug')('whois:client_pool');
/**
 * Tcp 客户端连接池
 * @param options
 * @constructor
 */
var ClientPool = function(options) {
    this._options = Object.assign({
        timeout: consts.TIME_OUT_MS   //超时20秒后超时
    }, options);
};
ClientPool.prototype._clients = [];
ClientPool.prototype._isCallbacked = false;

ClientPool.prototype.init = function(configs, callback) {
    debug('Init');
    this._clients = [];
    var self = this;
    for(var i in configs){
        var Client = require('./../libs/client.js');
        var client = new Client(configs[i], function(client, err, data){
            if (err) {
                debug('Error', err);
                self.remove(client);
                if(!self._clients || self._clients.length <= 0){
                    //if(!self._isCallbacked){
                    //    self._isCallbacked = true;
                        callback(client, err,  null);
                    //}
                }
            }else{
                debug('Got data ...');
                self.removeAll();
                //if(!self._isCallbacked) {
                //    self._isCallbacked = true;
                    callback(client, err, data);
                //}
            }
        });
        this._clients.push(client);
    }
    //设置超时
    setTimeout(function(){
        debug('Time out');
        self.removeAll();
        //if(!self._isCallbacked){
        //    self._isCallbacked = true;
            callback(null, 'ETIMEDOUT', null);
        //}
    }, this._options.timeout);
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
}
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
