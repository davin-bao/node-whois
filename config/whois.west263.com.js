var extend = require('./../libs/extend');
var DEFAULT_CONFIG = require('./whois.default');

var CONFIG = extend(DEFAULT_CONFIG, {
    HOST: 'whois.west263.com',
    PARAM: '$',
    FIELDS: [
        {name: 'DomainName', prefix: 'Domain Name:' },
        {name: 'CreationDate', prefix: 'Creation Date:' },
        {name: 'ExpirationDate', prefix: 'Registrar Registration Expiration Date:' },
        {name: 'RawData', prefix: '' },

        {name: 'NameServer', prefix: 'Name Server:' },
        {name: 'DomainStatus', prefix: 'Domain Status:' },

        {name: 'Registrar', prefix: 'Registrar:' },
        {name: 'RegistrarIanaId', prefix: 'Registrar IANA ID:' },
        {name: 'RegistrarAbuseContactEmail', prefix: 'Registrar Abuse Contact Email:' },
        {name: 'RegistrarAbuseContactPhone', prefix: 'Registrar Abuse Contact Phone:' },

        {name: 'RegistrantId', prefix: 'Registrant ID:' },
        {name: 'Registrant', prefix: 'Registrant:' },
        {name: 'SponsoringRegistrar', prefix: 'Sponsoring Registrar:' },
        {name: 'RegistrantContactEmail', prefix: 'Registrant Contact Email:' },

        {name: 'RegistryFinanceID', prefix: 'Registry Registrant ID:' },
        {name: 'FinanceName', prefix: 'Registrant Name:' },
        {name: 'FinanceOrganization', prefix: 'Registrant Organization:' },
        {name: 'FinanceStreet', prefix: 'Registrant Street:' },
        {name: 'FinanceCity', prefix: 'Registrant City:' },
        {name: 'FinanceProvince', prefix: 'Registrant State/Province:' },
        {name: 'FinancePostalCode', prefix: 'Registrant Postal Code:' },
        {name: 'FinanceCountry', prefix: 'Registrant Country:' },
        {name: 'FinancePhone', prefix: 'Registrant Phone:' },
        {name: 'FinancePhoneExt', prefix: 'Registrant Phone Ext:' },
        {name: 'FinanceFax', prefix: 'Registrant Fax:' },
        {name: 'FinanceFaxExt', prefix: 'Registrant Fax Ext:' },
        {name: 'FinanceEmail', prefix: 'Registrant Email:' },

        {name: 'RegistryAdminID', prefix: 'Registry Admin ID:' },
        {name: 'AdminName', prefix: 'Admin Name:' },
        {name: 'AdminOrganization', prefix: 'Admin Organization:' },
        {name: 'AdminStreet', prefix: 'Admin Street:' },
        {name: 'AdminCity', prefix: 'Admin City:' },
        {name: 'AdminProvince', prefix: 'Admin State/Province:' },
        {name: 'AdminPostalCode', prefix: 'Admin Postal Code:' },
        {name: 'AdminCountry', prefix: 'Admin Country:' },
        {name: 'AdminPhone', prefix: 'Admin Phone:' },
        {name: 'AdminPhoneExt', prefix: 'Admin Phone Ext:' },
        {name: 'AdminFax', prefix: 'Admin Fax:' },
        {name: 'AdminFaxExt', prefix: 'Admin Fax Ext:' },
        {name: 'AdminEmail', prefix: 'Admin Email:' },

        {name: 'RegistryTechID', prefix: 'Registry Tech ID:' },
        {name: 'TechName', prefix: 'Tech Name:' },
        {name: 'TechOrganization', prefix: 'Tech Organization:' },
        {name: 'TechStreet', prefix: 'Tech Street:' },
        {name: 'TechCity', prefix: 'Tech City:' },
        {name: 'TechProvince', prefix: 'Tech State/Province:' },
        {name: 'TechPostalCode', prefix: 'Tech Postal Code:' },
        {name: 'TechCountry', prefix: 'Tech Country:' },
        {name: 'TechPhone', prefix: 'Tech Phone:' },
        {name: 'TechPhoneExt', prefix: 'Tech Phone Ext:' },
        {name: 'TechFax', prefix: 'Tech Fax:' },
        {name: 'TechFaxExt', prefix: 'Tech Fax Ext:' },
        {name: 'TechEmail', prefix: 'Tech Email:' },

        {name: 'DnsSec', prefix: 'DNSSEC:' },
        {name: 'IcannProblemReportingSystem', prefix: 'URL of the ICANN WHOIS Data Problem Reporting System:' },
        {name: 'WhoisOtherInfo', prefix: '>>>' }
    ]
});

module.exports = CONFIG;
