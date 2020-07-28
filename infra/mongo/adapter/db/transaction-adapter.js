const { TransactionModel } = require('../../transaction-model');
const { TransactionAdapter } = require('../../../../core/adapters/repository/transaction-repo');

const create = (transaction) => {

    transaction._id = transaction.id;

    return TransactionModel.create(transaction).then(doc => {
        return {
            id: doc._id,
            accountId: doc.accountId,
            value: doc.value,
            operation: doc.operation,
            transferToAccount: doc.transferToAccount,
            time: doc.time
        };
    });
}

const get = (id) => {
    return TransactionModel.findById(id).then(doc => {
        return {
            id: doc._id,
            accountId: doc.accountId,
            value: doc.value,
            operation: doc.operation,
            transferToAccount: doc.transferToAccount,
            time: doc.time
        };
    });
}

const CTransactionAdapter = function() {
    TransactionAdapter.apply(this, arguments);
}

CTransactionAdapter.prototype = Object.create(TransactionAdapter.prototype, { 'constructor': TransactionAdapter });
CTransactionAdapter.prototype.create = create;
CTransactionAdapter.prototype.get = get;

module.exports.transactionAdapter = new CTransactionAdapter();
