const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get relationMappings() {
        return {
            userId: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'user.user_id',
                    to: 'driver.userId'
                }
            },
            userId: {
                relation: Model.HasManyRelation,
                modelClass: Passenger,
                join: {
                    from: 'user.user_id',
                    to: 'passenger.userId'
                }
            }
        };
    }
}

module.exports = { User };