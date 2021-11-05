const { Model } = require('objection');

class Vehicle_Type extends Model {
    static get tableName() {
        return 'vehicle_type';
    }

    static get relationMappings() {
        return {
            vehicle_types: {
                relation: Model.HasManyRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/Vehicle'),
                join: {
                    from: 'vehicle_type.vehicle_type_id',
                    to: 'vehicle.vehicleTypeId'
                }
            }
        };
    }

    
}

module.exports = { Vehicle_Type };