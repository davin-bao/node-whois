/**
 * 封装 log4js
 */
var log4js = require('log4js');
var logDirectory = __dirname + '/../log';

var logger = function logger(name) {

    log4js.configure({
        appenders: [
            //{ type: 'console' }, //控制台输出
            {
                type: 'dateFile', //文件输出
                filename: logDirectory + '/log',
                "alwaysIncludePattern": true,
                "pattern": "-yyyy-MM-dd.log",
                maxLogSize: 1024,
                backups:3,
                category: name
            }
        ]
    });
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};

module.exports = logger;