const { Model } = require('objection');

class VehicleType extends Model {
  static get tableName() {
    return "vehicle_type";
  }

  static get relationMappings() {
    return {
        vehicle_types: {
            relation: Model.HasManyRelation,
            modelClass: Vehicle,
            join: {
                from: 'vehicle_type.vehicle_type_id',
                to: 'vehicle.vehicleTypeId'
            }
        }
    };
  }

}

module.exports = VehicleType;