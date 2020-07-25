const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Transaction = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        accountId: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        operation: {
            type: String,
            enum: ['deposit', 'withdrawal', 'transfer']
        },
        transferToAccount: {
            type: String
        },
        time: {
            type: Date,
            default: new Date()
        }
    }
);

const TransactionModel = mongoose.model("transactions", Transaction);

module.exports = { TransactionModel };