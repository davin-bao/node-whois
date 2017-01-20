
var consts = require('./../config/constants');
var extend = require('object-extend');

/**
 * 简单解析器，直接分割后利用前缀匹配字段
 * @param data
 * @param items
 * @param separator
 * @returns {Array}
 * @constructor
 */
var EasyParser = function(data, items, separator){
    var result = {}, list = data.split(separator);

    var fields = extend({}, consts.FIELDS);
    items = extend(fields, items);
    for(var i in items){
        var item = items[i];
        for(var index in list){
            var str = list[index];
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            if(item.prefix !== '' && str.indexOf(item.prefix) === 0) {
                if(item.isArray){
                    (typeof(result[item.name]) === 'undefined') && (result[item.name] = []);
                    result[item.name].push(str.replace(item.prefix, '').replace(/(^\s*)|(\s*$)/g, ""));
                }else{
                    result[item.name] = str.replace(item.prefix, '').replace(/(^\s*)|(\s*$)/g, "");
                }
            }
        }
        if(typeof(result[item.name]) === 'undefined'){
            if(item.require === true) {
                return {code: 500, message: '域（'+item.name+')未获取成功', rawData: data};
            }
            result[item.name] = '';
        }
    }

    result['RawData'] = data.toString();
    return result;
};

module.exports = EasyParser;
