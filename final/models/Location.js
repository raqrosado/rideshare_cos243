const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'location';
    }
    
    static get relationMappings() {
        return {
            locationId: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'location.location_id',
                    to: 'ride.fromLocationId'
                }
            },
            locationId: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'location.location_id',
                    to: 'ride.toLocationId'
                }
            }
        };
    }
}

module.exports = { Location };