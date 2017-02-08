'use strict';

var consts = {};
module.exports = consts;
/**
 * Redis 缓存服务器配置
 * @type {boolean}
 */
consts.CACHE_ENABLE = true;
consts.CACHE_HOST = '127.0.0.1';
consts.CACHE_PORT = 6379;
consts.CACHE_DB = 2;
consts.CACHE_SECOND = 86400;   //设置的过期时间不合法，则使用默认缓存时间 1天

//WHOIS 根服务器
consts.WHOIS_DEFAULT_HOST = 'whois.iana.org';
consts.WHOIS_DEFAULT_PORT = 43;
//默认是否直走注册局
consts.DEFAULT_ONLY_REGISTRY = false;
//请求超时时间（ms）
consts.TIME_OUT_MS = 30000;
//需解析的特殊报文服务器列表
consts.WHOIS_SERVER_LIST = [
    {
        config: 'whois.cnnic.cn',
        tld: ['cn']
    },
    {
        host: 'com.whois-servers.net',
        tld: ['com', 'net']
    },
    {
        config: 'whois.nawang.cn',
        tld: ['cn', 'com', 'net', 'tt']
    },
    {
        config: 'whois.nic.name',
        tld: ['name']
    },
    {
        config: 'whois.west263.com',
        tld: ['top']
    },
    {
        config: 'whois.nic.top',
        tld: ['top']
    }
];
//返回字段配置， require 必定返回字段，如不存在则抛弃结果
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
