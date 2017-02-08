'use strict';

var util = require('util');
var Events = require('./../libs/events');
var debug = require('debug')('whois:whois');
var fs = require('fs');
var extend = require('./../libs/extend');

var is = require('./is');
var consts = require('./../config/constants');
var ClientPool = require('./../libs/clientPool');
var Client = require('./../libs/client.js');
var Parser = require('./../libs/parser');
var Cache = require('./../libs/cache');

var serverLevel = 0;
/**
 * Whois LookUp
 * whois 查询入口方法
 * @constructor
 */
var Whois = function(onlyRegistry){
    if (!(this instanceof Whois)) return new Whois(arguments[0], arguments[1]);
    Events.call(this);

    this._onlyRegistry = onlyRegistry || consts.DEFAULT_ONLY_REGISTRY;
    debug('Init');
    this._parser = new Parser();
    this._cache = this._cache || new Cache();
    this._clientPool = this._clientPool || new ClientPool();

};

util.inherits(Whois, Events);
/**
 * 查询 WHOIS
 * @param domain 待查询的域名
 */
Whois.prototype.lookup = function(domain, refresh){
    if(!Whois.validDomain(domain)){
        throw TypeError('输入的domain参数非法');
    }

    var self = this;

    self._cache.get(domain, function(whoisData){
        if(whoisData == null || refresh){
            self._lookup(domain, function(whoisData){
                if(whoisData.code == 200){
                    self._cache.save(whoisData);
                }
                self.emit('onFinish', whoisData);
            });
        }else{
            self.emit('onFinish', whoisData);
        }
    });
};
/**
 * 查询完成后执行回调， 传递查询结果
 * @param fn
 */
Whois.prototype.onFinish = function(fn){
    this.once('onFinish', fn);
};

/**
 * 建立连接池，并发查询
 * @param domain
 * @param callback
 * @private
 */
Whois.prototype._lookup = function (domain, callback) {
    var self = this,
        clientList = [],
        clientPool = new ClientPool(),
        tldConfigList = self.getTldConfigList(domain);
    clientPool.init(tldConfigList);

    clientPool.onClientSuccess(function(client, data){
        //存储已访问的客户端对象， 防止重复访问
        clientList.push(client);
        var parsedData = self.parseData(client, data, {});
        Whois.prototype._deepLookup(clientPool, client, domain, parsedData, callback);
    });
    clientPool.onTimeout(function(client, err){
        callback({ code: 504, message: err.message });
    });
    clientPool.onError(function(client, err){
        callback({ code: 504, message: err.message });
    });

    clientPool.send(domain);
};
/**
 * 向一个服务器发送请求， 如果有下级 WHOIS 服务器， 将递归查询
 * @param domain 需查询的域名
 * @param parseData 上一级服务器获取的已解析数据包
 * @param callback
 * @private
 */
Whois.prototype._deepLookup = function(clientPool, rootClient, domain, parsedData, callback){
    var self = this;

    if(typeof(parsedData.WhoisServer) == 'undefined'){
        clientPool.removeAll();
        callback(extend({code: 200}, parsedData));
        return;
    }

    var newTldConfig = Whois.getConfig(parsedData.WhoisServer);
    delete parsedData.WhoisServer;
    var client = new Client(newTldConfig);
    client.onSuccess(function(client, data){
        var newParsedData = self.parseData(client, data, parsedData);
        self._deepLookup(clientPool, rootClient, domain, newParsedData, callback);
    });
    client.onError(function(client, err){
        clientPool.remove(rootClient);
        debug('client.onError ', err);
    });

    client.send(domain);
};
/**
 * 将新获取的数据进行解析， 并且与 parsedData 合并
 * @param client 当前服务器对象
 * @param data 当前服务器返回的数据
 * @param parsedData 上级服务器已解析的数据
 * @returns {*}
 */
Whois.prototype.parseData = function(client, data, parsedData){
    var self = this,
        searchServerObj = {};
    serverLevel ++;
    searchServerObj['searchServerLevel_'+ serverLevel] = client.getConfig().HOST;
    //使用解析器解析返回的报文
    this._parser = this._parser || new Parser();
    var childParseData = self._parser.parse(client.getConfig(), data);

    data = extend(parsedData, childParseData);
    return extend(searchServerObj, data);
};
/**
 * 根据域名信息获取后缀配置服务器配置列表， 生成配置文件
 * @param domain
 * @returns {Array}
 */
Whois.prototype.getTldConfigList = function(domain) {
    var tldConfig = [], tld = Whois.getTld(domain);
    //加载已知的配置
    for(var index in consts.WHOIS_SERVER_LIST){
        var whoisServer = consts.WHOIS_SERVER_LIST[index];
        if(!is.array(whoisServer.tld) || whoisServer.tld.length <= 0){
            throw SyntaxError('后缀（'+tld+'）的配置有误，期望为数组');
        }
        if(whoisServer.tld.indexOf(tld) >= 0){
            var config = Whois.getConfig(whoisServer.host);
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
        var config = Whois.getConfig(host);
        tldConfig.push(config);
    }
    //加载根 WHOIS 服务器
    tldConfig.push(Whois.getConfig(consts.WHOIS_DEFAULT_HOST));

    if(!is.array(tldConfig) || tldConfig.length <= 0) throw RangeError('当前系统不支持该域名后缀('+tld+')');
    return tldConfig;
};

/**
 * 验证该域名是否为合法域名
 * @param domain
 * @returns {boolean}
 */
Whois.validDomain = function(domain){
    var regTest=/^[\u4e00-\u9fa5A-z0-9]+\.[[\u4e00-\u9fa5A-z0-9]+(\.[[\u4e00-\u9fa5A-z0-9]+)*$/g;
    return regTest.test(domain);
};
/**
 * 获取该域名的后缀
 * @param domain
 * @returns {string|XML|void}
 */
Whois.getTld = function(domain){
    var regMatch=/^[\u4e00-\u9fa5A-z0-9]+\./g;
    var matchResult = domain.match(regMatch);
    var tld = domain.replace(matchResult.shift(), '');

    if(is.empty(tld)) throw TypeError('输入的domain参数非法');
    return tld;
};
/**
 * 加载本地配置
 * @param host
 * @returns {*}
 */
Whois.getConfig = function(host){
    var tldConfigFile = fs.existsSync(__dirname + './../config/' + host + '.js') ? './../config/' + host + '.js' : './../config/whois.default.js';
    debug('Get config file(' + tldConfigFile + ')');
    if(!fs.existsSync(__dirname + tldConfigFile)){
        throw SyntaxError('HOST(' + host + ')配置有误，文件（'+tldConfigFile+'）不存在');
    }
    var config = extend({}, require(tldConfigFile));
    config.HOST = host;
    return config;
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

