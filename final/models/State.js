const { Model } = require('objection');

class State extends Model {
    static get tableName() {
        return 'state';
    }

    static get relationMappings() {
        return {
            license_states: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'state.abbreviation',
                    to: 'vehicle.licenseState'
                }
            },
            license_states: {
                relation: Model.HasManyRelation,
                modelClass: Location,
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            },
            license_states: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'state.abbreviation',
                    to: 'driver.licenseState'
                }
            }
        };
    }
}

module.exports = State;








        