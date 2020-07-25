
const { AccountAdapter } = require('./adapter/db/account-adapter.js');
const { v4 } = require('node-uuid');

module.exports.createAccount = (account) => {
    if (!account.document || account.document === '') {
        throw new Error('document is required');
    }
    else if (!account.name || account.name === '') {
        throw new Error('document is required');
    }
    
    account.id = v4();
    return new AccountAdapter().create(account);
}