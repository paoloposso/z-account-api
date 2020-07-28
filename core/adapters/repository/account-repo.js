const AccountAdapter = function () {
    if (this.constructor === AccountAdapter) {
        throw new Error('cannot instantiate abstract class');
    }
}

AccountAdapter.prototype.getByDocument = (document) => {
    throw new Error('cannot call abstract method');
}

AccountAdapter.prototype.create = (document) => {
    throw new Error('cannot call abstract method');
}

module.exports = { AccountAdapter };