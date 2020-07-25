const { createAccount } = require('../service/account');

module.exports.AccountService = class AccountService {
    create(account) {
        return createAccount(account);
    }
}