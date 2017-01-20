var consts = require('./../config/constants');
var extend = require('object-extend');
var debug = require('debug')('whois:parser');

/**
 * WHOIS 信息解析器
 * @param format
 * @constructor
 */
var Parser = function(format){
    debug('Init');
    this._format = format;
};
/**
 * 解析 WHOIS 数据
 * @param config 服务器配置
 * @param whoisData WHOIS 数据
 * @returns {string}
 */
Parser.prototype.parse = function (config, whoisData){
    this._config = config;
    this._whoisData = whoisData;
    switch (this._format.toUpperCase()){
        case 'JSON':
            return this.parseJson();
        case 'STRING':default:
            return this.parseString();
    }
};

Parser.prototype.getWhoisServer = function(){};

/**
 * 调用 JSON 解析器
 * @returns {string}
 */
Parser.prototype.parseJson =function (){
    var config = this._config;
    var whoisData = this._whoisData;

    if(!config.parseJson) throw SyntaxError('未配置服务器（'+config.HOST+'）的 JSON 解析器');
    return config.parseJson(whoisData, config.FIELDS);
};

/**
 * 调用字符串解析器
 * @returns {string}
 */
Parser.prototype.parseString = function (){
    var config = this._config;
    var whoisData = this._whoisData;

    return config.parseString ? config.parseString(whoisData) : whoisData.toString();
};
/**
 * 验证是否含有必填字段
 * @param config
 * @param data
 * @returns {boolean}
 */
Parser.isValid = function(config, data){
    var fields = extend({}, consts.FIELDS);
    fields = extend(fields, config.FIELDS);
    var str = data.toString();

    for(var index in fields){
        var item = fields[index];
        if(item.require === true && str.indexOf(item.prefix) === -1){
            return false;
        }
    }
    return true;
};

module.exports = Parser;