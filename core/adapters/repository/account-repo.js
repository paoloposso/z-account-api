const AccountAdapter = function () {
}

AccountAdapter.prototype.getByDocument = (document) => {
    throw new Error('cannot call abstract method');
}

AccountAdapter.prototype.create = (account) => {
    throw new Error('cannot call abstract method');
}

module.exports = { AccountAdapter };
