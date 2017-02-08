var redis = require('redis');
var consts = require('./../config/constants');
var debug = require('debug')('whois:cache');
/**
 * Redis 缓存类
 Cache Class
 **/
var Cache = function(){
    this._redis = redis.createClient({
        host: consts.CACHE_HOST,
        port: consts.CACHE_PORT,
        db: consts.CACHE_DB
    });
};
/**
 * 保存数据 key：domainName ， value： whoisData， 缓存过期时间： ExpirationDate
 * @param data
 */
Cache.prototype.save = function (data) {
    var domainName = data.DomainName;
    var expirationDate = Cache.formatTime(data.ExpirationDate);
    this.set(domainName, JSON.stringify(data), expirationDate);
};
/**
 * 保存数据到缓存
 * @param key
 * @param value
 * @param expireTime
 */
Cache.prototype.set = function(key, value, expireTime){
    this._redis.set(key, value);
    this._redis.expireat(key, expireTime );
    value = ((value == null) ? 'null' : value.toString().substr(0, 10) + '...');
    debug('Set key:' + key + ', value: ' + value + ' expireTime:' + new Date(expireTime * 1000));
};
/**
 * 从缓存中获取数据
 * @param key
 * @param callback
 */
Cache.prototype.get = function(key, callback) {
    if(!consts.CACHE_ENABLE){
        debug('Get key:' + key + ', value: ' + null);
        callback(null);
    }else{
        this._redis.get(key, function (err, reply) {
            var value = reply == null ? 'null' : reply.toString().substr(0, 10) + '...';
            debug('Get key:' + key + ', value: ' + value);
            callback(JSON.parse(reply));
        });
    }
};
/**
 * 格式化各种时间，返回时间戳， 如果不合法，则返回（当前时间 + 配置时间段）
 * @param expirationDate
 * @returns {number}
 */
Cache.formatTime = function(expirationDate){
    var date = new Date(expirationDate);
    if(date == 'Invalid Date'){
        //缓存 24h
        return parseInt((+new Date)/1000) + consts.CACHE_SECOND;
    }
    //到期时间 - 24h
    return parseInt((date)/1000) - 86400;
};

module.exports = Cache;