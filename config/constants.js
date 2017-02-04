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
        tld: ['cn', 'com', 'net', 'tt']
    },
    {
        config: __dirname + '/whois.nic.name.js',
        tld: ['name']
    },
    {
        config: __dirname + '/whois.west263.com.js',
        tld: ['top']
    },
    {
        config: __dirname + '/whois.nic.top.js',
        tld: ['top']
    }
];

consts.FIELDS = {
    DomainName: { require: true, isArray: false },
    CreationDate: { require: true, isArray: false },
    ExpirationDate: { require: true, isArray: false },
    RawData: { require: false, isArray: false },

    NameServer: { require: false, isArray: true },
    DomainStatus: { require: false, isArray: true },

    Registrar: { require: false, isArray: false },
    RegistrarIanaId: { require: false, isArray: false },
    RegistrarAbuseContactEmail: { require: false, isArray: false },
    RegistrarAbuseContactPhone: { require: false, isArray: false },

    RegistrantId: { require: false, isArray: false },
    Registrant: { require: false, isArray: false },
    SponsoringRegistrar: { require: false, isArray: false },
    RegistrantContactEmail: { require: false, isArray: false },

    RegistryFinanceID: { require: false, isArray: false },
    FinanceName: { require: false, isArray: false },
    FinanceOrganization: { require: false, isArray: false },
    FinanceStreet: { require: false, isArray: false },
    FinanceCity: { require: false, isArray: false },
    FinanceProvince: { require: false, isArray: false },
    FinancePostalCode: { require: false, isArray: false },
    FinanceCountry: { require: false, isArray: false },
    FinancePhone: { require: false, isArray: false },
    FinancePhoneExt: { require: false, isArray: false },
    FinanceFax: { require: false, isArray: false },
    FinanceFaxExt: { require: false, isArray: false },
    FinanceEmail: { require: false, isArray: false },

    RegistryAdminID: { require: false, isArray: false },
    AdminName: { require: false, isArray: false },
    AdminOrganization: { require: false, isArray: false },
    AdminStreet: { require: false, isArray: false },
    AdminCity: { require: false, isArray: false },
    AdminProvince: { require: false, isArray: false },
    AdminPostalCode: { require: false, isArray: false },
    AdminCountry: { require: false, isArray: false },
    AdminPhone: { require: false, isArray: false },
    AdminPhoneExt: { require: false, isArray: false },
    AdminFax: { require: false, isArray: false },
    AdminFaxExt: { require: false, isArray: false },
    AdminEmail: { require: false, isArray: false },

    RegistryTechID: { require: false, isArray: false },
    TechName: { require: false, isArray: false },
    TechOrganization: { require: false, isArray: false },
    TechStreet: { require: false, isArray: false },
    TechCity: { require: false, isArray: false },
    TechProvince: { require: false, isArray: false },
    TechPostalCode: { require: false, isArray: false },
    TechCountry: { require: false, isArray: false },
    TechPhone: { require: false, isArray: false },
    TechPhoneExt: { require: false, isArray: false },
    TechFax: { require: false, isArray: false },
    TechFaxExt: { require: false, isArray: false },
    TechEmail: { require: false, isArray: false },

    DnsSec: { require: false, isArray: false },
    IcannProblemReportingSystem: { require: false, isArray: false },
    WhoisOtherInfo: { require: false, isArray: false }
};
