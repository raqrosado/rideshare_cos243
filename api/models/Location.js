const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'location';
    }
}

module.exports = { Location };