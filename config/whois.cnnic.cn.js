var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.cnnic.cn',
    IS_REGISTRY: true,
    FIELDS: {
        DomainName: { prefix: 'Domain Name:'},
        CreationDate: { prefix: 'Registration Time:'},
        ExpirationDate: { prefix: 'Expiration Time:'},
        RawData: { prefix: ''},

        NameServer: { prefix: 'Name Server:'},
        DomainStatus: { prefix: 'Domain Status:'},

        RegistrantId: { prefix: 'Registrant ID:'},
        Registrant: { prefix: 'Registrant:'},
        SponsoringRegistrar: { prefix: 'Sponsoring Registrar:'},
        RegistrantContactEmail: { prefix: 'Registrant Contact Email:'}
    }
});

module.exports = CONFIG;
