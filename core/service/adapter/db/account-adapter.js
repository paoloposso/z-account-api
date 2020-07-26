const { AccountModel } = require('../../../../infra/mongo/account-model');

class AccountAdapter {

    async create(account) {
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
    getByDocument(document) {
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
    updateBalance(id, balance) {

        return AccountModel.findById(id).then(account => {
            account.currentBalance = balance;
            account.save();
        });

        // return AccountModel.findOneAndUpdate({_id: id}, {
        //     currentBalance: balance
        // });
    }
}

module.exports.accountAdapter = new AccountAdapter();