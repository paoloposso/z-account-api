
const adapterFactory = require('../../factories/db-adapter-factory');
const { generateUuid } = require('../cross-cutting/id-generation');

const accountAdapter = adapterFactory.getAdapter('AccountAdapter');
const transactionAdapter = adapterFactory.getAdapter('TransactionAdapter');

module.exports.deposit = async (transaction) => {

    if (!transaction.value || transaction.value === '' || transaction.value === 0) {
        return Promise.reject({message: 'value is required', type: 'param'});
    }
    else if (isNaN(transaction.value)) {
        return Promise.reject({message: 'value is invalid', type: 'param'});
    }
    else if (isNaN(transaction.document)) {
        return Promise.reject({message: 'document is invalid', type: 'param'});
    }

    const account = await accountAdapter.getByDocument(transaction.document);

    if (!account || !account.document || account.document === '') {
        return Promise.reject({message: 'account document is invalid', type: 'notFound'});
    }

    transaction.type = 'deposit';

    transaction.accountId = account.id;
        
    transaction.id = generateUuid();

    return transactionAdapter.create(transaction).then((transaction) => {
        accountAdapter.updateBalance(account.id, account.currentBalance + (transaction.value * 1.005).toFixed(2));
        return transaction;
    });
}

module.exports.withdraw = async (transaction) => {

    if (!transaction.value || transaction.value === '' || transaction.value === 0) {
        return Promise.reject({message: 'value is required', type: 'param'});
    }
    else if (isNaN(transaction.value)) {
        return Promise.reject({message: 'value is invalid', type: 'param'});
    }
    else if (isNaN(transaction.document)) {
        return Promise.reject({message: 'document is invalid', type: 'param'});
    }

    return accountAdapter.getByDocument(transaction.document).then(account => {

        if (!account || !account.document || account.document === '') {
            return Promise.reject({message: 'account document is invalid', type: 'notFound'});
        }

        transaction.type = 'withdrawal';

        if (account.currentBalance - transaction.value < 0) {
            return Promise.reject({message: 'not enough funds', type: 'param'});
        }
        
        transaction.id = generateUuid();
        transaction.accountId = account.id;

        return transactionAdapter.create(transaction).then((transaction) => {
            accountAdapter.updateBalance(account.id, (account.currentBalance  - (transaction.value * 1.01)).toFixed(2));
            return transaction;
        });
    });
}

module.exports.transfer =  async (transaction) => {

    if (!transaction.value || transaction.value === '' || transaction.value === 0) {
        return Promise.reject({message: 'value is required', type: 'param'});
    } else if (isNaN(transaction.value)) {
        return Promise.reject({message: 'value is invalid', type: 'param'});
    } else if (isNaN(transaction.document)) {
        return Promise.reject({message: 'document is invalid', type: 'param'});
    } else if (isNaN(transaction.documentTo)) {
        return Promise.reject({message: 'documentTo is invalid', type: 'param'});
    }

    let accountFrom = await accountAdapter.getByDocument(transaction.document);
    let accountTo = await accountAdapter.getByDocument(transaction.documentTo);

    if (!accountFrom || !accountFrom.id) {
        return Promise.reject({message: 'document from is invalid', type: 'param'});
    }
    if (!accountTo || !accountTo.id) {
        return Promise.reject({message: 'document to is invalid', type: 'param'});
    }

    transaction.type = 'transfer';

    if (accountFrom.currentBalance - transaction.value < 0) {
        return Promise.reject({message: 'not enough funds', type: 'param'});
    }
    
    transaction.id = generateUuid();
    transaction.accountId = accountFrom.id;
    transaction.transferToAccount = accountTo.id;

    return transactionAdapter.create(transaction).then((transaction) => {
        accountAdapter.updateBalance(accountFrom.id, accountFrom.currentBalance - transaction.value);
        accountAdapter.updateBalance(accountTo.id, accountTo.currentBalance + transaction.value);

        return transaction;
    });
}