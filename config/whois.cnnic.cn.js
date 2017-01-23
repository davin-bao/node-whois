var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.cnnic.cn',
    IS_REGISTRY: true,
    FIELDS: [
        {name: 'DomainName', prefix: 'Domain Name:' },
        {name: 'CreationDate', prefix: 'Registration Time:' },
        {name: 'ExpirationDate', prefix: 'Expiration Time:' },
        {name: 'RawData', prefix: '' },

        {name: 'NameServer', prefix: 'Name Server:' },
        {name: 'DomainStatus', prefix: 'Domain Status:' },

        {name: 'RegistrantId', prefix: 'Registrant ID:' },
        {name: 'Registrant', prefix: 'Registrant:' },
        {name: 'SponsoringRegistrar', prefix: 'Sponsoring Registrar:' },
        {name: 'RegistrantContactEmail', prefix: 'Registrant Contact Email:' }
    ]
});

module.exports = CONFIG;
