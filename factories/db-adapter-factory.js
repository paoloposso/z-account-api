const accountAdapter = require('../infra/mongo/adapter/db/account-adapter');
const transactionAdapter = require('../infra/mongo/adapter/db/transaction-adapter');

module.exports.getAccountAdapter = () => {
      return accountAdapter;
}

module.exports.getTransactionAdapter = () => {
      return transactionAdapter;
}