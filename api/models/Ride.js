const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'ride';
    }
}

module.exports = { Ride };