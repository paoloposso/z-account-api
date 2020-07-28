const { TransactionModel } = require('../../transaction-model');

module.exports.create = (transaction) => {

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

module.exports.get = (id) => {
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