
var debug = require('debug')('whois:whois');
var fs = require('fs');
var extend = require('object-extend');

var is = require('./is');
var consts = require('./../config/constants');
var ClientPool = require('./../libs/clientPool');
var Parser = require('./../libs/parser');

/**
 * Whois LookUp
 * whois 查询入口方法
 * @param format 返回的格式 json | string
 * @constructor
 */
var Whois = function(format, onlyRegistry){
    this._format = format || consts.DEFAULT_FORMAT;
    this._onlyRegistry = onlyRegistry || consts.DEFAULT_ONLY_REGISTRY;
    debug('Init (format:'+this._format+')');
    this._parser = new Parser(this._format);
    this._level = 0;
};
/**
 * 查询
 * @param domain 待查询的域名
 */
Whois.prototype.lookup = function(domain, callback){
    if(!Whois.validDomain(domain)){
        throw TypeError('输入的domain参数非法');
    }

    var self = this;

    self._deepLookup(domain, {}, callback);
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

        var tldConfigFile = fs.existsSync('./../config/' + server) ? './../config/' + server : './../config/whois.default';
        var config = extend({}, require(tldConfigFile));
        config.HOST = server;
        tldConfig.push(config);
        return tldConfig;
    }
    //第一级 WHOIS 服务器
    var tldConfigFileList = consts.WHOIS_SERVER_LIST[tld];
    if(!is.array(tldConfigFileList) || tldConfigFileList.length <= 0){
        throw SyntaxError('后缀（'+tld+'）的配置有误，期望为数组');
    }
    for(var index in tldConfigFileList){
        var tldConfigFile = tldConfigFileList[index];
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

    if(!is.array(tldConfig) || tldConfig.length <= 0) throw RangeError('当前系统不支持该域名后缀('+tld+')');
    return tldConfig;
};

module.exports = Whois;

