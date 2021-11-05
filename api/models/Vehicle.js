const { Model } = require('objection');

class Vehicle extends Model {
    static get tableName() {
        return 'vehicle';
    }

    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/VehicleType'),
                join: {
                    from: 'vehicle.vehicleTypeId',
                    to: 'vehicle_type.vehicle_type_id'
                }
            },
            licenseStates: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/VehicleType'),
                join: {
                    from: 'vehicle.licenseState',
                    to: 'state.name'
                }
            }
        };
    }


}

module.exports = { Vehicle };