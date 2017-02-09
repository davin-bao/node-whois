var easyParser = require('./../libs/easyParser');
var extend = require('./../libs/extend');

var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.verisign-grs.com',
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
        WhoisServer: { prefix: 'Whois Server:'}
    }
});

module.exports = CONFIG;
/**
 * Created by Administrator on 2017/2/9.
 */
