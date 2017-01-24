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
    return config.parseJson(whoisData, config.FIELDS);
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