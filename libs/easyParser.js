'use strict';

var is = require('./is');
var consts = require('./../config/constants');
var extend = require('./../libs/extend');

/**
 * 简单解析器，直接分割后利用前缀匹配字段
 * @param data
 * @param items
 * @param separator
 * @returns {Array}
 * @constructor
 */
var EasyParser = function(config, data, separator){
    var result = {}, list = data.split(separator);
    var items = extend(consts.FIELDS, config.FIELDS);

    for(var key in items){
        var item = items[key];
        for(var index in list){
            var str = list[index];
            str = str.replace(/(^\s*)|(\s*$)/g, "");

            if(item.prefix !== '' && key === 'WhoisOtherInfo'){
                var pos = data.indexOf(item.prefix);
                result[key] = data.substr(pos, data.length - pos);
            }else if(item.prefix !== '' && str.indexOf(item.prefix) === 0) {
                if(item.isArray){
                    (typeof(result[key]) === 'undefined' || is.empty(result[key])) && (result[key] = []);
                    result[key].push(str.replace(item.prefix, '').replace(/(^\s*)|(\s*$)/g, ""));
                }else{
                    result[key] = str.replace(item.prefix, '').replace(/(^\s*)|(\s*$)/g, "");
                }
            }
        }
        if(typeof(result[key]) === 'undefined'){
            if(!config.IS_ROOT && item.require === true) {
                return {code: 500, message: '域（'+key+')未获取成功', rawData: data};
            }
            result[key] = '';
        }
    }

    result['RawData'] = data.toString();
    return result;
};

module.exports = EasyParser;
