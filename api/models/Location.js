const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'location';
    }
    
    static get relationMappings() {
        return {
            states: {
                relation: Model.BelongsToOneRelation,
                modelClass: path.join('__C:/Users/rockr/Desktop/Taylor/cos243/rideshare_cos243/api/models', '/Location'),
                join: {
                    from: 'location.state',
                    to: 'state.name'
                }
            }
        };
    }
}

module.exports = { Location };