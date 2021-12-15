const { Model } = require('objection');
const User = require("./User");
const Driver = require("./Driver");

class Ride extends Model {
    static get tableName() {
        return 'ride';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'passenger.rideId',
                        to: 'passenger.userId'
                    },
                    to: 'user.id'
                }
            },
            drivers: {
                relation: Model.ManyToManyRelation,
                modelClass: Driver,
                join: {
                    from: 'ride.id',
                    through: {
                        from: 'drivers.rideId',
                        to: 'drivers.driverId'
                    },
                    to: 'driver.id'
                }
            }
        };
    }

}

module.exports = Ride;