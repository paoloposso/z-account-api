const { AccountModel } = require('../../../../infra/mongo/account-model');

module.exports.create = async (account) => {
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
module.exports.getByDocument = (document) => {
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
module.exports.updateBalance = (id, balance) => {

    return AccountModel.findById(id).then(account => {
        account.currentBalance = balance;
        account.save();
    });
}