'use strict';

var debug = require('debug')('whois:whois');
var fs = require('fs');
var extend = require('./../libs/extend');

var is = require('./is');
var consts = require('./../config/constants');
var ClientPool = require('./../libs/clientPool');
var Parser = require('./../libs/parser');
var Cache = require('./../libs/cache');

/**
 * Whois LookUp
 * whois 查询入口方法
 * @constructor
 */
var Whois = function(onlyRegistry){
    this._onlyRegistry = onlyRegistry || consts.DEFAULT_ONLY_REGISTRY;
    debug('Init');
    this._parser = new Parser();
    this._level = 0;
    this._cache = this._cache || new Cache();
};
/**
 * 查询
 * @param domain 待查询的域名
 */
Whois.prototype.lookup = function(domain, refresh, callback){
    if(!Whois.validDomain(domain)){
        throw TypeError('输入的domain参数非法');
    }

    var self = this;

    self._cache.get(domain, function(whoisData){
        if(whoisData == null || refresh){
            self._deepLookup(domain, {}, function(whoisData){
                if(whoisData.code == 200){
                    self._cache.save(whoisData);
                }
                callback(whoisData);
            });
        }else{
            callback(whoisData);
        }
    });
};

Whois.prototype.lookup = function (domain, whoisData, callback) {
    var self = this;
    self._deepLookup(domain, {}, function(whoisData){
        if(whoisData.code == 200){
            callback(whoisData);
        }else{
            //到 IANA 查询 WHOIS 服务器及信息
            self._deepLookup(domain, { WhoisServer: 'whois.iana.org'}, function(whoisData){
                callback(whoisData);
            });
        }
    });
};

Whois.prototype._deepLookup = function (domain, parseData, callback) {
    var self = this,
        clientPool = new ClientPool(),
        tldConfig = this._getServerConfig(domain, parseData);

    self._level ++;

    clientPool.init(tldConfig, function(client, err, data) {
        var searchServerObj = {};
        searchServerObj['searchServerLevel_'+ self._level] = client == null ? {} :  client.getConfig().HOST;

        if (err) {
            callback(extend(searchServerObj, { code: 504, message: err.message }));
        } else {
            //使用解析器解析返回的报文
            var childParseData = self._parser.parse(client.getConfig(), data);

            data = extend(parseData, childParseData);
            data = extend(searchServerObj, data);

            if(typeof(childParseData.WhoisServer) !== 'undefined'){
                self._deepLookup(domain, data, callback);
            }else{
                callback(extend({code: 200}, data));
            }
        }
    });

    clientPool.send(domain);
};

Whois.validDomain = function(domain){
    var regTest=/^[\u4e00-\u9fa5A-z0-9]+\.[[\u4e00-\u9fa5A-z0-9]+(\.[[\u4e00-\u9fa5A-z0-9]+)*$/g;
    return regTest.test(domain);
};

Whois.getTld = function(domain){
    var regMatch=/^[\u4e00-\u9fa5A-z0-9]+\./g;
    var matchResult = domain.match(regMatch);
    var tld = domain.replace(matchResult.shift(), '');

    if(is.empty(tld)) throw TypeError('输入的domain参数非法');
    return tld;
};

Whois.prototype._getServerConfig = function(domain, whoisData){

    var tldConfig = [], tld = Whois.getTld(domain);

    if(typeof(whoisData.WhoisServer) !== 'undefined'){
        //下一级 WHOIS 服务器
        var server = whoisData.WhoisServer;
        delete(whoisData.WhoisServer);

        var tldConfigFile = fs.existsSync(__dirname + '/../config/' + server + '.js') ? './../config/' + server : './../config/whois.default';
        var config = extend({}, require(tldConfigFile));
        config.HOST = server;
        tldConfig.push(config);
        return tldConfig;
    }
    //加载已知的配置
    for(var index in consts.WHOIS_SERVER_LIST){
        var whoisServer = consts.WHOIS_SERVER_LIST[index];
        if(!is.array(whoisServer.tld) || whoisServer.tld.length <= 0){
            throw SyntaxError('后缀（'+tld+'）的配置有误，期望为数组');
        }
        if(whoisServer.tld.indexOf(tld) >= 0){
            var tldConfigFile = whoisServer.config;
            debug('Get config file(' + tldConfigFile + ')');
            if(!fs.existsSync(tldConfigFile)){
                throw SyntaxError('后缀（'+tld+'）的配置有误，文件（'+tldConfigFile+'）不存在');
            }
            var config = extend({}, require(tldConfigFile));
            if(!this._onlyRegistry) { //如果非只选择注册局，直接加入列表
                debug('Add Server('+config.HOST+') to list (onlyRegistry:'+this._onlyRegistry+')');
                tldConfig.push(config);
            }else if(config.IS_REGISTRY){ //如果只选择注册局，那么只加入注册局到列表
                debug('Add Server('+config.HOST+') to list (IS_REGISTRY:'+config.IS_REGISTRY+')');
                tldConfig.push(config);
            }
        }
    }
    //加载 EPP 协议要求的配置 whois.nic.*
    var host = 'whois.nic.' + tld;
    if(!Whois.isServerConfigExist(tldConfig, host)){
        var tldConfigFile = fs.existsSync(__dirname + '/../config/' + server) ? './../config/' + server : './../config/whois.default';
        var config = extend({}, require(tldConfigFile));
        config.HOST = host;
        tldConfig.push(config);
    }

    if(!is.array(tldConfig) || tldConfig.length <= 0) throw RangeError('当前系统不支持该域名后缀('+tld+')');
    return tldConfig;
};
/**
 * 查询当前的配置库中是否含有 host 配置
 * @param tldConfig
 * @param host
 * @returns {boolean}
 */
Whois.isServerConfigExist = function(tldConfig, host){
    for(var config in tldConfig){
        if(config.HOST == host){
            return true;
        }
    }
    return false;
}

module.exports = Whois;

