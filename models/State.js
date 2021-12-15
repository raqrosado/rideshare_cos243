const { Model } = require('objection');
const Driver = require("./Driver");
const Location = require("./Location");
const Vehicle = require("./Vehicle");

class State extends Model {
    static get tableName() {
        return 'state';
    }

    static get relationMappings() {
        return {
            drivers: {
                relation: Model.HasManyRelation,
                modelClass: Driver,
                join: {
                    from: 'state.abbreviation',
                    to: 'driver.licenseState'
                }
            },
            locations: {
                relation: Model.HasManyRelation,
                modelClass: Location,
                join: {
                    from: 'state.abbreviation',
                    to: 'location.state'
                }
            },
            vehicles: {
                relation: Model.HasManyRelation,
                modelClass: Vehicle,
                join: {
                    from: 'state.abbreviation',
                    to: 'vehicle.licenseState'
                }
            },
        };
    }
}

module.exports = State;








        