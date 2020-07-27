const mongoose = require('mongoose');

module.exports.connectToMongoDb = () => {

    let mongoDB = process.env.MONGODB_URI;

    // running locally
    if (!mongoDB) {
        mongoDB = 'mongodb://localhost:27017/zaccounts'
    }

    if (process.env.NODE_ENV === 'test') {
        mongoDB += '_test';
    }

    mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(cnn => console.log('mongo connected on port', cnn.connection.port, 'ready state', cnn.connection.readyState))
        .catch(err => console.error(err));

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => console.error('error trying to connect to mongo', err));

    mongoose.connection.once("open", function() {
        console.log("MongoDB database connection established successfully");
    });
}
