var redis = require('redis');
var consts = require('./../config/constants');
var debug = require('debug')('whois:cache');
/**
 Cache Class
 **/
var Cache = function(){
    this._redis = redis.createClient({
        host: consts.CACHE_HOST,
        port: consts.CACHE_PORT,
        db: consts.CACHE_DB
    });
};

Cache.prototype.save = function (data) {
    var domainName = data.DomainName;
    var expirationDate = Cache.formatTime(data.ExpirationDate);
    this.set(domainName, JSON.stringify(data), expirationDate);
};

Cache.prototype.set = function(key, value, expireTime){
    this._redis.set(key, value);
    this._redis.expireat(key, expireTime );
    value = ((value == null) ? 'null' : value.toString().substr(0, 10) + '...');
    debug('Set key:' + key + ', value: ' + value + ' expireTime:' + new Date(expireTime * 1000));
};

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

Cache.formatTime = function(expirationDate){
    var date = new Date(expirationDate);
    if(date == 'Invalid Date'){
        //缓存 24h
        return parseInt((+new Date)/1000) +  + 86400;
    }
    //到期时间 - 24h
    return parseInt((date)/1000) - 86400;
};

module.exports = Cache;