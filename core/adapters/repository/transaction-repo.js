const TransactionAdapter = function () {
    if (this.constructor === TransactionAdapter) {
        throw new Error('cannot instantiate abstract class');
    }
}

TransactionAdapter.prototype.create = (transaction) => {
    throw new Error('cannot call abstract method');
}

TransactionAdapter.prototype.get = (id) => {
    throw new Error('cannot call abstract method');
}

module.exports = { TransactionAdapter };