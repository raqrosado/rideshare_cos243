const { Model } = require('objection');
const Ride = require("./Ride");

class Location extends Model {
    static get tableName() {
        return 'location';
    }
    
    static get relationMappings() {
        return {
            fromLocations: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'location.id',
                    to: 'ride.fromLocationId'
                }
            },
            toLocations: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'location.id',
                    to: 'ride.toLocationId'
                }
            }
        };
    }
}

module.exports = Location;