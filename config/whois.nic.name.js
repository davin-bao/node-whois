var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.nic.name',
    IS_REGISTRY: true,
    PARAM: 'domain =$',
    FIELDS: {
        DomainName: { prefix: 'Domain Name:'},
        CreationDate: { prefix: 'Created On:'},
        ExpirationDate: { prefix: 'Expires On:'},
        RawData: { prefix: ''},

        NameServer: { prefix: 'Name Server:'},
        DomainStatus: { prefix: 'Domain Status:'},

        RegistrarIanaId: { prefix: 'Sponsoring Registrar IANA ID:'},
        SponsoringRegistrar: { prefix: 'Sponsoring Registrar:'},

        RegistrantId: { prefix: 'Registrant ID:'},
        RegistryFinanceID: { prefix: 'Billing ID:'},
        RegistryAdminID: { prefix: 'Admin ID:'},
        RegistryTechID: { prefix: 'Tech ID:'}
    }
});

module.exports = CONFIG;
