'use strict';

var consts = require('./../config/constants');
var extend = require('./../libs/extend');
var debug = require('debug')('whois:parser');

/**
 * WHOIS 信息解析器
 * @constructor
 */
var Parser = function(){
    debug('Init');
};
/**
 * 解析 WHOIS 数据
 * @param config 服务器配置
 * @param whoisData WHOIS 数据
 * @returns {string}
 */
Parser.prototype.parse = function (config, whoisData){
    if(!config.parseJson) throw SyntaxError('未配置服务器（'+config.HOST+'）的 JSON 解析器');
    return config.parseJson(whoisData);
};
/**
 * 设置config.IS_ROOT， 如果存在 whois server 字段则判断为 root server
 * @param config
 * @param data
 */
Parser.judgeIsRoot = function(config, data){
    var fields = extend(consts.FIELDS, config.FIELDS);
    var str = data.toString();
    if(typeof(fields.WhoisServer) == 'object' && typeof(fields.WhoisServer.prefix) == 'string' && str.indexOf(fields.WhoisServer.prefix) > -1){
        config.IS_ROOT =  true;
    }
    //默认 false
    return true;
};

/**
 * 验证是否含有必填字段
 * @param config
 * @param data
 * @returns {boolean}
 */
Parser.isValid = function(config, data){
    var fields = extend(consts.FIELDS, config.FIELDS);
    var str = data.toString();
    //如果不是最终whois 服务器，则直接返回true， 等待递归转发
    if(config.IS_ROOT){
        return true;
    }
    for(var key in fields){
        var item = fields[key];
        if(item.require === true && str.indexOf(item.prefix) === -1){
            debug('validate fail, miss key: ' + key + ' ', item.prefix);
            return false;
        }
    }
    return true;
};

module.exports = Parser;