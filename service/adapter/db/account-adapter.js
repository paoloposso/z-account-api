const { AccountModel } = require('../../../infra/mongo/account-model');

module.exports.AccountAdapter = class Account {

    async create(account) {
        let existing = await AccountModel.find({document: account.document});

        if (existing && existing.length > 0)
            return Promise.reject('account already exists');
        
        account._id = account.id;

        return AccountModel.create(account).then(doc => {
            return {
                name: doc.name,
                document: doc.document,
                id: doc._id
            };
        });
    }
}
