const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Transaction = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        value: {
            type: number,
            required: true
        },
        type: {
            type: String,
            enum: ['credit', 'debit']
        }
    }
);

const Model = mongoose.model("transactions", Transaction);

module.exports = { Model };