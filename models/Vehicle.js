const { Model } = require('objection');
const Ride = require("./Ride");
const Driver = require("./Driver");

class Vehicle extends Model {
    static get tableName() {
        return "vehicle";
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Ride,
                join: {
                    from: 'vehicle.id',
                    to: 'ride.vehicleId'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'vehicle.id',
                    through: {
                        from: 'authorization.vehicleId',
                        to: 'authorization.driverId'
                    },
                    to: 'driver.id'
                }
            }
        };
    }
}

module.exports = Vehicle;