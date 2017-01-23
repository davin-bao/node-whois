var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.nic.name',
    IS_REGISTRY: true,
    PARAM: 'domain =$',
    FIELDS: [
        {name: 'DomainName', prefix: 'Domain Name:' },
        {name: 'CreationDate', prefix: 'Created On:' },
        {name: 'ExpirationDate', prefix: 'Expires On:' },
        {name: 'RawData', prefix: '' },

        {name: 'NameServer', prefix: 'Name Server:' },
        {name: 'DomainStatus', prefix: 'Domain Status:' },

        {name: 'RegistrarIanaId', prefix: 'Sponsoring Registrar IANA ID:' },
        {name: 'SponsoringRegistrar', prefix: 'Sponsoring Registrar:' },

        {name: 'RegistrantId', prefix: 'Registrant ID:' },
        {name: 'RegistryFinanceID', prefix: 'Billing ID:' },
        {name: 'RegistryAdminID', prefix: 'Admin ID:' },
        {name: 'RegistryTechID', prefix: 'Tech ID:' }
    ]
});

module.exports = CONFIG;
