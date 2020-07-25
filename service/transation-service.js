
const { transactionAdapter } = require('./adapter/db/transaction-adapter.js');
const { accountAdapter } = require('./adapter/db/account-adapter.js');
const { v4 } = require('node-uuid');

module.exports.deposit = (transaction) => {

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

        transaction.type = 'deposit';

        //add five per cent
        transaction.value = transaction.value * 1.05;
        transaction.value = transaction.value.toFixed(2);
        transaction.accountId = account.id;
        
        transaction.id = v4();

        return new transactionAdapter.create(transaction);
    });
}


module.exports.withdrawal = async (transaction) => {

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

        transaction.value = transaction.value * 0.99;
        transaction.value = transaction.value.toFixed(2);

        if (account.currentBalance - transaction.value < 0) {
            return Promise.reject({message: 'not enough funds', type: 'param'});
        }
        
        transaction.id = v4();
        transaction.accountId = account.id;

        return new transactionAdapter.create(transaction);
    });
}

module.exports.transfer =  async (transaction) => {

    if (!transaction.value || transaction.value === '' || transaction.value === 0) {
        return Promise.reject({message: 'value is required', type: 'param'});
    }
    else if (isNaN(transaction.value)) {
        return Promise.reject({message: 'value is invalid', type: 'param'});
    }
    else if (isNaN(transaction.document)) {
        return Promise.reject({message: 'document is invalid', type: 'param'});
    }

    let accountFrom = await accountAdapter.getByDocument(transaction.documentFrom);
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
    
    transaction.id = v4();
    transaction.accountId = accountFrom.id;
    transaction.transferToAccount = accountTo.id;

    return transactionAdapter.create(transaction);
}