const { Model } = require('objection');

class Driver extends Model {
    static get tableName() {
        return 'driver';
    }

    static get relationMappings() {
        return {
            driverIds: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/User'),
                join: {
                    from: 'driver.userId',
                    to: 'user.user_id'
                }
            },
            licenseStates: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/State'),
                join: {
                    from: 'driver.licenseState',
                    to: 'state.name'
                }
            }
        };
    }
}

module.exports = { Driver };