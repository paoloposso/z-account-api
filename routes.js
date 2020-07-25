const express = require('express');
// const { AccountController } = require('./controllers/account-controller');
const { deposit } = require('./service/transation-service');
const { createAccount, getByDocument } = require('./service/account');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('app up and running!'));

app.post('/account', (req, res) => {

    createAccount(req.body).then((account) => {
        return res.json(account);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.get('/account/bydocument/:document', (req, res) => {
    getByDocument(req.params.document).then((account) => {
        return res.json(account);
    }).catch((err) => { 
        return handleHttpError(res, err);
    });
});

app.post('/transaction/deposit', (req, res) => {
    deposit(req.body).then((transaction) => {
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
