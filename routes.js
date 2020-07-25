const express = require('express');
const { AccountService } = require('./controllers/account-controller');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('app up and running!'));

app.post('/account', (req, res) => {
    new AccountService().create(req.body).then((account) => {
        res.json(account);
    }).catch((err) => res.status(400).json({message: err}));
});

module.exports = { app };
