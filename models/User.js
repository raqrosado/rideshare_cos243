const { Model } = require('objection');
const Driver = require("./Driver");
const Ride = require("./Ride");

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'user.id',
                    to: 'driver.id'
                }
            },
            rides: {
                relation: Model.ManyToManyRelation,
                modelClass: Ride,
                join: {
                    from: 'user.id',
                    through: {
                        from: 'passenger.userId',
                        to: 'passenger.rideId'
                    },
                    to: 'ride.id'
                }
            }
        };
    }
}

module.exports = User;