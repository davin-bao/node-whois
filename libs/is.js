/*eslint-env shared-node-browser, mocha */
'use strict';

var toString = Object.prototype.toString;
var slice = Array.prototype.slice;
var builtIns = [Number, String, Boolean, Array, RegExp, Date, Function, Object];
var Nones = [undefined, null];
var g = global || window;

module.exports = is;

/**
 * check an object is given type
 * @param  function/class  Type    built in or  user defined type
 * @param  any             obj     check type of this object
 * @return function/bool
 *
 * usage:
 * 1. built in type
 *    is(Array, []) -> true
 * 2. null or undefined
 *    is(null, '') -> false
 * 3. only first argument given will return a typed checker
 *    is(String) -> is.string
 */
function is() {
    var args = slice.call(arguments);

    if (args.length < 1 || args.length > 2) {
        throw new Error('Expecting one or tow argument(s)');
    }

    var isType = function(obj) {
        var Type = args[0];
        if (!!~Nones.indexOf(Type)) {
            return obj === Type;
        }

        var type = toString.call(obj);

        if (!!~builtIns.indexOf(Type)) {
            return type === toString.call(new Type);
        }

        if (Type === 'Arguments') {
            return type === '[object Arguments]';
        }

        if (is(Function, Type)) {
            var Etype = g.TypeError ? g.TypeError : Error;
            throw new Etype('Expecting a function in is type check');
        }

        return obj instanceof Type;
    };

    return args.length === 1 ? isType : isType(args[1]);
}

/**
 * compose two or more type checker as one
 * @param  string op      'and' or 'or'
 * @return function       a complex checker
 *
 * usage:
 *     _compose(is.function, is.MyTypeExtendsFunction)
 */
var _compose = function(op) {
    var types = slice.call(arguments, 1);

    if (!types.length) {
        var Etype = g.RangeError ? g.RangeError : Error;
        throw new Etype('Expecting no less than one Type when ' + op + ' type check');
    }

    if (!~['and', 'or'].indexOf(op)) {
        throw new Error('Unknown compose operator ' + op);
    }

    return function(obj) {
        return types.reduce(function(result, type) {
            return op === 'and' ? result && type(ojb) : result || type(obj);
        }, op === 'and');
    }
}

/**
 * check object is All Types given
 * @param   type/class Type1
 * @param   type/class Type2
 * ...
 * @return function   a complex checker
 */
is.both = function() {
    return _compose.apply(null, ['and'].concat(slice.call(arguments)));
}

/**
 * check object is One of given Types
 * @param   type/class Type1
 * @param   type/class Type2
 * ...
 * @return function   a complex checker
 */
is.either = function() {
    var args = ['or'].concat(slice.call(arguments));
    return _compose.apply(null, args);
}

/**
 * reverse the given checker
 * @param  function    checker
 * @return function    the reversed checker
 */
is.not = function(checker) {
    return function(obj) {
        return !checker(obj);
    }
}

// built in types
is.number = is(Number);
is.string = is(String);
is.bool = is(Boolean);
is.array = is(Array);
is.regexp = is(RegExp);
is.date = is(Date);
is.func = is(Function);
is.obj = is(Object);

// Arguments is a hidden built in type
is.args = is('Arguments');


// none types
is.null = is(null);
is.undefined = is(undefined);

// boolean type true
is.true = function(obj) {
    return is.bool(obj) && obj;
}

// boolean type false
is.false = function(obj) {
    return is.bool(obj) && !obj;
}

// null or undefined
is.none = is.either(is.null, is.undefined);

// not null and not undefined
is.some = is.not(is.none);

// empty string/object/array
is.empty = is.either(is.none, is.false, function(obj) {
    return !!~['""', '{}', '[]'].indexOf(JSON.stringify(obj));
});

// NaN is a special number, NaN is not eq it self
is.nan = is.both(is.number, function(obj) {
    return obj !== obj;
});

// Infinity is another special number, Infinity is eqal 1/0
is.Infinity = is.both(is.number, function(obj) {
    return obj === 1 / 0;
});