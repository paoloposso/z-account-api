const { app } = require('../routes');
const supertest = require('supertest');
const request = supertest(app);
const { AccountModel } = require('../infra/mongo/account-model');

const { connectToMongoDb } = require('../infra/mongo/mongo-connect.js');

connectToMongoDb();

jest.setTimeout(30000);

beforeAll(async () => {
    await AccountModel.deleteMany({});
});

describe('Account tests', () => {   

    it('should insert account for John', async (done) => {

        const res = await request.post('/account').send({
            "name": "John",
            "document": "01234567890"
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('John');
        expect(res.body._id).not.toEqual('');

        done();
    });

    // it('should list all accounts', async (done) => {
    //     const res = await request.get('/accounts/all');

    //     expect(res.body.accounts && res.body.accounts.length > 0).toBeTruthy();

    //     done();
    // });
});

afterAll(async done => {
    done();
});