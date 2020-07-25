var uuid = require('node-uuid');

module.exports.generateUuid = () => {
    return uuid.v4();
}