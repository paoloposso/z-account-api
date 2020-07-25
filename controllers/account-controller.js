const { createAccount, getByDocument } = require('../service/account');

module.exports.AccountController = class AccountController {
    create(account) {
        return createAccount(account);
    }

    /**
     * 
     * @param {String} document
     */
    getByDocument(document) {
        return getByDocument(document);
    }
}