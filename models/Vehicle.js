const { Model } = require('objection');

class Vehicle extends Model {
    static get tableName() {
        return "vehicle";
    }
}

module.exports = Vehicle;