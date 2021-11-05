const { Model } = require('objection');

class Vehicle_Type extends Model {
    static get tableName() {
        return 'vehicle_type';
    }
}

module.exports = { Vehicle_Type };