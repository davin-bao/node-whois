var easyParser = require('./../libs/easyParser');

var CONFIG = {
    HOST: '',
    PORT: 43,
    IS_REGISTRY: false,
    PARAM: '$',
    FIELDS: {
        DomainName: { prefix: 'Domain Name:'},
        CreationDate: { prefix: 'Creation Date:'},
        ExpirationDate: { prefix: 'Registrar Registration Expiration Date:'},
        RawData: { prefix: ''},

        NameServer: { prefix: 'Name Server:'},
        DomainStatus: { prefix: 'Domain Status:'},

        Registrar: { prefix: 'Registrar:'},
        RegistrarIanaId: { prefix: 'Registrar IANA ID:'},
        RegistrarAbuseContactEmail: { prefix: 'Registrar Abuse Contact Email:'},
        RegistrarAbuseContactPhone: { prefix: 'Registrar Abuse Contact Phone:'},

        RegistrantId: { prefix: 'Registrant ID:'},
        Registrant: { prefix: 'Registrant:'},
        SponsoringRegistrar: { prefix: 'Sponsoring Registrar:'},
        RegistrantContactEmail: { prefix: 'Registrant Contact Email:'},

        RegistryFinanceID: { prefix: 'Registry Registrant ID:'},
        FinanceName: { prefix: 'Registrant Name:'},
        FinanceOrganization: { prefix: 'Registrant Organization:'},
        FinanceStreet: { prefix: 'Registrant Street:'},
        FinanceCity: { prefix: 'Registrant City:'},
        FinanceProvince: { prefix: 'Registrant State/Province:'},
        FinancePostalCode: { prefix: 'Registrant Postal Code:'},
        FinanceCountry: { prefix: 'Registrant Country:'},
        FinancePhone: { prefix: 'Registrant Phone:'},
        FinancePhoneExt: { prefix: 'Registrant Phone Ext:'},
        FinanceFax: { prefix: 'Registrant Fax:'},
        FinanceFaxExt: { prefix: 'Registrant Fax Ext:'},
        FinanceEmail: { prefix: 'Registrant Email:'},

        RegistryAdminID: { prefix: 'Registry Admin ID:'},
        AdminName: { prefix: 'Admin Name:'},
        AdminOrganization: { prefix: 'Admin Organization:'},
        AdminStreet: { prefix: 'Admin Street:'},
        AdminCity: { prefix: 'Admin City:'},
        AdminProvince: { prefix: 'Admin State/Province:'},
        AdminPostalCode: { prefix: 'Admin Postal Code:'},
        AdminCountry: { prefix: 'Admin Country:'},
        AdminPhone: { prefix: 'Admin Phone:'},
        AdminPhoneExt: { prefix: 'Admin Phone Ext:'},
        AdminFax: { prefix: 'Admin Fax:'},
        AdminFaxExt: { prefix: 'Admin Fax Ext:'},
        AdminEmail: { prefix: 'Admin Email:'},

        RegistryTechID: { prefix: 'Registry Tech ID:'},
        TechName: { prefix: 'Tech Name:'},
        TechOrganization: { prefix: 'Tech Organization:'},
        TechStreet: { prefix: 'Tech Street:'},
        TechCity: { prefix: 'Tech City:'},
        TechProvince: { prefix: 'Tech State/Province:'},
        TechPostalCode: { prefix: 'Tech Postal Code:'},
        TechCountry: { prefix: 'Tech Country:'},
        TechPhone: { prefix: 'Tech Phone:'},
        TechPhoneExt: { prefix: 'Tech Phone Ext:'},
        TechFax: { prefix: 'Tech Fax:'},
        TechFaxExt: { prefix: 'Tech Fax Ext:'},
        TechEmail: { prefix: 'Tech Email:'},

        DnsSec: { prefix: 'DNSSEC:'},
        IcannProblemReportingSystem: { prefix: 'URL of the ICANN WHOIS Data Problem Reporting System:'},
        WhoisOtherInfo: { prefix: '>>>'}
    },
    parseJson: function(whoisData, fields){
        var separator = '\n';
        return easyParser(whoisData, fields, separator);
    }
};

module.exports = CONFIG;
