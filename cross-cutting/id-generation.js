var uuid = require('node-uuid');

module.exports.generate = () => {
    return uuid.v4();
}