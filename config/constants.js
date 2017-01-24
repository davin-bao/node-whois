'use strict';

var consts = {};
module.exports = consts;

consts.CACHE_ENABLE = true;
consts.CACHE_HOST = '127.0.0.1';
consts.CACHE_PORT = 6379;
consts.CACHE_DB = 2;

consts.WHOIS_DEFAULT_HOST = 'whois.iana.org';
consts.WHOIS_DEFAULT_PORT = 43;
//默认是否直走注册局
consts.DEFAULT_ONLY_REGISTRY = false;

consts.TIME_OUT_MS = 30000;

consts.WHOIS_SERVER_LIST = [
    {
        config: __dirname + '/whois.cnnic.cn.js',
        tld: ['cn']
    },
    {
        config: __dirname + '/com.whois-servers.net.js',
        tld: ['com', 'net']
    },
    {
        config: __dirname + '/whois.nawang.cn.js',
        tld: ['cn', 'com', 'net']
    },
    {
        config: __dirname + '/whois.nic.name.js',
        tld: ['name']
    },
    //{
    //    config: __dirname + '/whois.west263.com.js',
    //    tld: ['top']
    //},
    {
        config: __dirname + '/whois.nic.top.js',
        tld: ['top']
    }
];

consts.FIELDS = [
    {name: 'DomainName', require: true, isArray: false },
    {name: 'CreationDate', require: true, isArray: false },
    {name: 'ExpirationDate', require: true, isArray: false },
    {name: 'RawData', require: false, isArray: false },

    {name: 'NameServer', require: false, isArray: true },
    {name: 'DomainStatus', require: false, isArray: true },

    {name: 'Registrar', require: false, isArray: false },
    {name: 'RegistrarIanaId', require: false, isArray: false },
    {name: 'RegistrarAbuseContactEmail', require: false, isArray: false },
    {name: 'RegistrarAbuseContactPhone', require: false, isArray: false },

    {name: 'RegistrantId', require: false, isArray: false },
    {name: 'Registrant', require: false, isArray: false },
    {name: 'SponsoringRegistrar', require: false, isArray: false },
    {name: 'RegistrantContactEmail', require: false, isArray: false },

    {name: 'RegistryFinanceID', require: false, isArray: false },
    {name: 'FinanceName', require: false, isArray: false },
    {name: 'FinanceOrganization', require: false, isArray: false },
    {name: 'FinanceStreet', require: false, isArray: false },
    {name: 'FinanceCity', require: false, isArray: false },
    {name: 'FinanceProvince', require: false, isArray: false },
    {name: 'FinancePostalCode', require: false, isArray: false },
    {name: 'FinanceCountry', require: false, isArray: false },
    {name: 'FinancePhone', require: false, isArray: false },
    {name: 'FinancePhoneExt', require: false, isArray: false },
    {name: 'FinanceFax', require: false, isArray: false },
    {name: 'FinanceFaxExt', require: false, isArray: false },
    {name: 'FinanceEmail', require: false, isArray: false },

    {name: 'RegistryAdminID', require: false, isArray: false },
    {name: 'AdminName', require: false, isArray: false },
    {name: 'AdminOrganization', require: false, isArray: false },
    {name: 'AdminStreet', require: false, isArray: false },
    {name: 'AdminCity', require: false, isArray: false },
    {name: 'AdminProvince', require: false, isArray: false },
    {name: 'AdminPostalCode', require: false, isArray: false },
    {name: 'AdminCountry', require: false, isArray: false },
    {name: 'AdminPhone', require: false, isArray: false },
    {name: 'AdminPhoneExt', require: false, isArray: false },
    {name: 'AdminFax', require: false, isArray: false },
    {name: 'AdminFaxExt', require: false, isArray: false },
    {name: 'AdminEmail', require: false, isArray: false },

    {name: 'RegistryTechID', require: false, isArray: false },
    {name: 'TechName', require: false, isArray: false },
    {name: 'TechOrganization', require: false, isArray: false },
    {name: 'TechStreet', require: false, isArray: false },
    {name: 'TechCity', require: false, isArray: false },
    {name: 'TechProvince', require: false, isArray: false },
    {name: 'TechPostalCode', require: false, isArray: false },
    {name: 'TechCountry', require: false, isArray: false },
    {name: 'TechPhone', require: false, isArray: false },
    {name: 'TechPhoneExt', require: false, isArray: false },
    {name: 'TechFax', require: false, isArray: false },
    {name: 'TechFaxExt', require: false, isArray: false },
    {name: 'TechEmail', require: false, isArray: false },

    {name: 'DnsSec', require: false, isArray: false },
    {name: 'IcannProblemReportingSystem', require: false, isArray: false },
    {name: 'WhoisOtherInfo', require: false, isArray: false }
];
