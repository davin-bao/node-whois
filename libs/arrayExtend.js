
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
        if (Object.prototype.toString.call(b[key]) == '[object Object]') {
            if (Object.prototype.toString.call(a[key]) != '[object Object]') {
                a[key] = b[key];
            } else {
                a[key] = _extend(a[key], b[key]);
            }
        } else {
            a[key] = b[key];
        }
    });
    return a;
};