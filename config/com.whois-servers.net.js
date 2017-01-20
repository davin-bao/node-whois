var easyParser = require('./../libs/easyParser');
var extend = require('object-extend');
var DEFAULT_CONFIG = extend({}, require('./whois.default'));

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'com.whois-servers.net',
    IS_REGISTRY: true,
    PARAM: 'domain =$',
    FIELDS: [
        {name: 'DomainName', prefix: 'Domain Name:' },
        {name: 'CreationDate', prefix: 'Creation Date:' },
        {name: 'ExpirationDate', prefix: 'Expiration Date:' },
        {name: 'RawData', prefix: '' },

        {name: 'NameServer', prefix: 'Name Server:' },
        {name: 'DomainStatus', prefix: 'Status:' },

        {name: 'Registrar', prefix: 'Registrar:' },
        {name: 'RegistrarIanaId', prefix: 'Sponsoring Registrar IANA ID:' },
        {name: 'SponsoringRegistrar', prefix: 'Sponsoring Registrar:' },
        {name: 'WhoisServer', prefix: 'Whois Server:' }
    ]
});

module.exports = CONFIG;
