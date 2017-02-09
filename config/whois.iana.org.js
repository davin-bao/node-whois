var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');

var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.iana.org',
    IS_REGISTRY: true,
    FIELDS: {
        DomainName: { require: false },
        CreationDate: {require: false },
        ExpirationDate: {  require: false, prefix: 'Registry Expiry Date:'},
        WhoisServer: {  require: true, prefix: 'refer:'}
    },
    parseJson: function(whoisData){
        var separator = '\n\n';
        return easyParser(this, whoisData, separator);
    }
});

module.exports = CONFIG;
