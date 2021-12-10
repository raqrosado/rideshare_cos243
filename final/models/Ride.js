const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {
            rideId: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'ride.ride_id',
                    to: 'drivers.rideId'
                }
            },
            rideId: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join: {
                    from: 'ride.ride_id',
                    to: 'passenger.rideId'
                }
            }
        };
    }

}

module.exports = Ride;