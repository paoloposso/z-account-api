const { app } = require('./routes');
const { connectToMongoDb } = require('./infra/mongo/mongo-connect.js');

connectToMongoDb();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
