const SibApiV3Sdk = require('sib-api-v3-sdk');

module.exports = function marketingSmtpConfig(email) {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDIN_BLUE_API_KEY;

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = email;
    createContact.listIds = [2]

    apiInstance.createContact(createContact).then(function (data) {
        return true;
    }, function (error) {
        return error;
    });
}