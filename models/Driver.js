const { Model } = require('objection');
const Vehicle = require("./Vehicle");
const Ride = require("./Ride");

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }

    static get relationMappings() {
        return {
            vehicles: {
                relation: Model.ManyToManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'authorization.driverId',
                        to: 'authorization.vehicleId'
                    },
                    to: 'vehicle.id'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
                join: {
                    from: 'driver.id',
                    through: {
                        from: 'drivers.driverId',
                        to: 'drivers.rideId'
                    }, 
                    to: 'ride.id'
                }
            }
        };
    }
}

module.exports = Driver;