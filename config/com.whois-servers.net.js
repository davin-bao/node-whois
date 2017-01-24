var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');

var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'com.whois-servers.net',
    IS_REGISTRY: true,
    PARAM: 'domain =$',
    FIELDS: {
        DomainName: { prefix: 'Domain Name:'},
        CreationDate: { prefix: 'Creation Date:'},
        ExpirationDate: { prefix: 'Expiration Date:'},
        RawData: { prefix: ''},

        NameServer: { prefix: 'Name Server:'},
        DomainStatus: { prefix: 'Status:'},

        Registrar: { prefix: 'Registrar:'},
        RegistrarIanaId: { prefix: 'Sponsoring Registrar IANA ID:'},
        SponsoringRegistrar: { prefix: 'Sponsoring Registrar:'},
        WhoisServer: { prefix: 'Whois Server:'}
    }
});

module.exports = CONFIG;
