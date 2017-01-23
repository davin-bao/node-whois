
module.exports = function extend(a, b) {
    var target = _extend({}, a);
    return _extend(target, b);
};

function _extend(a, b) {
    // Don't touch 'null' or 'undefined' objects.
    if (a == null || b == null) {
        return a;
    }
    // TODO: Refactor to use for-loop for performance reasons.
    Object.keys(b).forEach(function (key) {
        // Detect object without array, date or null.
        // TODO: Performance test:
        // a) b.constructor === Object.prototype.constructor
        // b) Object.prototype.toString.call(b) == '[object Object]'
        switch (Object.prototype.toString.call(b[key])){
            case '[object String]':
            case '[object Number]':
            case '[object Boolean]':
                a[key] = b[key];
                break;
            case '[object Array]':
                var bFields = b[key].concat();
                if(key == 'FIELDS'){
                    if(Object.prototype.toString.call(a[key]) == '[object Undefined]'){
                        a[key] = bFields;
                    }else{
                        for(var bIndex in bFields){
                            var isFindField = false, bFiled = bFields[bIndex];
                            for(var aIndex in a[key]){
                                var aFiled = a[key][aIndex];
                                if(aFiled.name == bFiled.name){
                                    isFindField = true;
                                    var field = _extend({}, aFiled);
                                    a[key][aIndex] = _extend(field, bFiled);
                                }
                            }
                            if(!isFindField){
                                a[key].push(bFiled);
                            }
                        }
                    }
                }
                break;
            case '[object Object]':
                if (Object.prototype.toString.call(a[key]) != '[object Object]') {
                    a[key] = b[key];
                } else {
                    a[key] = _extend(a[key], b[key]);
                }
                break;
            case 'object Function':
            default:
                a[key] = b[key];
        }
    });
    return a;
};