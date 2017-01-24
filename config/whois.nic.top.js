var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');

var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.nic.top',
    IS_REGISTRY: true,
    FIELDS: [
        {name: 'DomainName', prefix: 'Domain Name:' },
        {name: 'ExpirationDate', prefix: 'Registry Expiry Date:' },
        {name: 'WhoisServer', prefix: 'WHOIS Server:' }
    ]
});

module.exports = CONFIG;
