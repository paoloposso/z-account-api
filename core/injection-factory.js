const { accountAdapter } = require('../infra/mongo/adapter/db/account-adapter');
const { transactionAdapter } = require('../infra/mongo/adapter/db/transaction-adapter');

const adapterDict = {
      AccountAdapter: accountAdapter,
      TransactionAdapter: transactionAdapter
}

module.exports.getAdapter = (adapterName) => {
      if (!adapterDict[adapterName])
            throw new Error(`Cannot instantiate concrete implementation of ${adapterName}`);
      return adapterDict[adapterName];
}