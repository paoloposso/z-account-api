const { app } = require('../routes');
const supertest = require('supertest');
const request = supertest(app);
const { AccountModel } = require('../infra/mongo/account-model');
const { TransactionModel } = require('../infra/mongo/transaction-model');

const { connectToMongoDb } = require('../infra/mongo/mongo-connect.js');

connectToMongoDb();

jest.setTimeout(30000);

beforeAll(async () => {
    await AccountModel.deleteMany({});
    await TransactionModel.deleteMany({});
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

    it('should insert account for John', async (done) => {

        const res = await request.post('/account').send({
            "name": "Jorge",
            "document": "01234567899"
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('Jorge');
        expect(res.body._id).not.toEqual('');

        done();
    });

    it('should list account by doc', async (done) => {
        const res = await request.get('/account/bydocument/01234567890');

        expect(res.body.document).toEqual('01234567890');

        done();
    });

    it('should deposit to John', async (done) => {

        const res = await request.post('/transaction/deposit').send({
            document: "01234567890",
            value: 50.50
        });

        expect(res.statusCode).toEqual(200);

        done();
    });

    it('should transfer to Jorge', async (done) => {

        const res = await request.post('/transaction/transfer').send({
            document: "01234567890",
            documentTo: "01234567899",
            value: 200
        });

        expect(res.statusCode).toEqual(200);

        done();
    });
});

afterAll(async done => {
    done();
});