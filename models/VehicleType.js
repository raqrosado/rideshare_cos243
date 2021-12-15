const { Model } = require('objection');
const Vehicle= require("./Vehicle");

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
                from: 'vehicle_type.id',
                to: 'vehicle.vehicleTypeId'
            }
        }
    };
  }

}

module.exports = VehicleType;