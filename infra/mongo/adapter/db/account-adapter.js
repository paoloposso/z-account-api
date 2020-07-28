const { AccountModel } = require('../../account-model');
const { AccountAdapter } = require('../../../../core/adapters/repository/account-repo');

const create = async (account) => {
    const existing = await AccountModel.find({document: account.document});

    if (existing && existing.length > 0)
        return Promise.reject({message: 'account already exists', type: 'param'});
    
    account._id = account.id;

    return AccountModel.create(account).then(doc => {
        return {
            name: doc.name,
            document: doc.document,
            id: doc._id,
            currentBalance: doc.currentBalance
        };
    });
}

/**
 * 
 * @param {String} document 
 */
const getByDocument = (document) => {
    return AccountModel.findOne({document}).then(doc => {
        return {
            name: doc.name,
            document: doc.document,
            id: doc._id,
            currentBalance: doc.currentBalance
        };
    });
}

/**
 * 
 * @param {String} id 
 * @param {Number} balance 
 */
const updateBalance = (id, balance) => {

    return AccountModel.findById(id).then(account => {
        account.currentBalance = balance;
        account.save();
    });
}

const CAccountAdapter = function() {
    AccountAdapter.apply(this, arguments);
}

CAccountAdapter.prototype = Object.create(AccountAdapter.prototype, { 'constructor': AccountAdapter });

CAccountAdapter.prototype.getByDocument = getByDocument;
CAccountAdapter.prototype.create = create;
CAccountAdapter.prototype.updateBalance = updateBalance;

module.exports.accountAdapter = new CAccountAdapter();