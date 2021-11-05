const { Model } = require('objection');

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }
}

module.exports = { Driver };