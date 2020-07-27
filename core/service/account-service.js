
const { getAccountAdapter } = require('../../factories/db-adapter-factory');
const { generateUuid } = require('../cross-cutting/id-generation');

const accountAdapter = getAccountAdapter();

module.exports.createAccount = (account) => {
    if (!account.document || account.document === '') {
        return Promise.reject({message: 'document is required', type: 'param'});
    } else if (!account.name || account.name === '') {
        return Promise.reject({message: 'name is required', type: 'param'});
    }
    
    account.id = generateUuid();
    return accountAdapter.create(account);
}

module.exports.getByDocument = (document) => {
    if (!document || document === '') {
        return Promise.reject({message: 'document is required', type: 'param'});
    }
    
    return accountAdapter.getByDocument(document);
}