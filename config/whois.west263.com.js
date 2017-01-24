var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.west263.com',
    FIELDS: {
        ExpirationDate: { prefix: 'Expiration Date:'}
    }
});

module.exports = CONFIG;
