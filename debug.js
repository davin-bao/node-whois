
var extend = require('object-extend');
var parent = {
    PARAM: 0,
    console: function(data){
        console.log('parent ' + data);
    }
};


var child = {
    ID: 1,
    console: function(data){
        console.log('child ' + data);
    }
};

var instance = extend(parent, child);
instance.console('hello world');
console.log(instance);