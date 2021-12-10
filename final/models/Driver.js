const { Model } = require('objection');

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }

    static get relationMappings() {
        return {
            driverId: {
                relation: Model.HasManyRelation,
                modelClass: Authorization,
                join: {
                    from: 'driver.driver_id',
                    to: 'authorization.driverId'
                }
            },
            driverId: {
                relation: Model.HasManyRelation,
                modelClass: Drivers,
                join: {
                    from: 'driver.driver_id',
                    to: 'drivers.driverId'
                }
            }
        };
    }
}

module.exports = Driver;