const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Account = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        document: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        currentBalance: {
            type: Number,
            default: 0
        }
    }
);

Account.index({document: 1});

const AccountModel = mongoose.model("accounts", Account);

module.exports = { AccountModel };