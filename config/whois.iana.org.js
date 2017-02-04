var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');

var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.iana.org',
    IS_REGISTRY: true,
    FIELDS: {
        ExpirationDate: { prefix: 'Registry Expiry Date:'},
        WhoisServer: { prefix: 'whois:'}
    },
    parseJson: function(whoisData){
        var separator = '\n\n';
        return easyParser(this, whoisData, separator);
    }
});

module.exports = CONFIG;
