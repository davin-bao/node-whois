/**
 * 自定义事件对象， nodejs 提供的事件绑定为全局绑定，不符合当前场景
 * @constructor
 */
var Events = function(){
    this._listeners = [];
};
/**
 * 触发事件
 */
Events.prototype.emit = function(){
    var type = 'unknown';
    var args = [];
    for(var i = 0; i < arguments.length; i++){
        i == 0 ? type = arguments[i] : args.push(arguments[i]);
    }
    if(typeof(this._listeners[type]) == 'undefined'){
        return;
    }
    var events = this._listeners[type];
    for(var i = 0; i < events.length; i++){
        var event = events[i];
        event.fn.apply(this, args);
        if(event.once){
            this._listeners[type].splice(i, 1);
        }
    }
};
/**
 * 绑定多次触发的事件
 * @param type
 * @param fn
 */
Events.prototype.on = function(type, fn){
    this.register(type, fn, false);
};
/**
 * 绑定只触发一次的事件
 * @param type
 * @param fn
 */
Events.prototype.once = function(type, fn){
    this._listeners[type] = [];
    this.register(type, fn, true);
};
/**
 * 绑定事件
 * @param type
 * @param fn
 * @param once
 */
Events.prototype.register = function(type, fn, once){
    if(typeof(this._listeners[type]) == 'undefined'){
        this._listeners[type] = [];
    }
    this._listeners[type].push({fn: fn, once: once});
};


module.exports = Events;