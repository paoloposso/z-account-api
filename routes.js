const express = require('express');
const transactionService = require('./core/service/transation-service');
const accountService = require('./core/service/account-service');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('app up and running!'));

app.post('/account', (req, res) => {

    accountService.createAccount(req.body).then((account) => {
        return res.json(account);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.get('/account/bydocument/:document', (req, res) => {
    accountService.getByDocument(req.params.document).then((account) => {
        return res.json(account);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.post('/transaction/deposit', (req, res) => {
    transactionService.deposit(req.body).then((transaction) => {
        return res.json(transaction);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.post('/transaction/transfer', (req, res) => {
    transactionService.transfer(req.body).then((transaction) => {
        return res.json(transaction);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.post('/transaction/withdraw', (req, res) => {
    transactionService.withdraw(req.body).then((transaction) => {
        return res.json(transaction);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

function handleHttpError(res, err) {
    if (err.type === 'param') return res.status(400).json({message: err.message});
    if (err.type === 'notFound') return res.status(404).json({message: err.message});
        
    return res.status(500).json({message: err.message});
}

module.exports = { app };
