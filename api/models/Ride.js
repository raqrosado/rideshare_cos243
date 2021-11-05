const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/Vehicle'),
                join: {
                    from: 'ride.vehicleId',
                    to: 'vehicle.vehicle_id'
                }
            },
            licenseStates: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/Location'),
                join: {
                    from: 'ride.fromLocationId',
                    to: 'location.location_id'
                }
            },
            licenseStates: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/Location'),
                join: {
                    from: 'ride.toLocationId',
                    to: 'location.location_id'
                }
            }
        };
    }

}

module.exports = { Ride };