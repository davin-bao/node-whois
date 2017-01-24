'use strict';

module.exports = function extend(a, b) {
    var target = _extend({}, a);
    return _extend(target, b);
};

function _extend(a, b) {
    // Don't touch 'null' or 'undefined' objects.
    if (b == null) {
        return a;
    }
    if(a == null){
        a = {};
    }
    // TODO: Refactor to use for-loop for performance reasons.
    Object.keys(b).forEach(function (key) {
        switch (Object.prototype.toString.call(b[key])){
            case '[object String]':
            case '[object Number]':
            case '[object Boolean]':
                a[key] = b[key];
                break;
            case '[object Array]':
                var bFields = b[key].concat();
                if(Object.prototype.toString.call(a[key]) == '[object Undefined]'){
                    a[key] = bFields;
                }else{
                    for(var bIndex in bFields){
                        var bFiled = bFields[bIndex];
                        if(Object.prototype.toString.call(a[key]) == '[object Undefined]'){
                            a[key] = bFields;
                        }else if(Object.prototype.toString.call(a[key]) == '[object Array]'){
                            if(a[key].indexOf(bFiled) < 0){
                                a[key].push(bFiled);
                            }
                        }
                    }
                }
                break;
            case '[object Object]':
                a[key] = _extend(a[key], b[key]);
                break;
            case 'object Function':
            default:
                a[key] = b[key];
        }
    });
    return a;
};