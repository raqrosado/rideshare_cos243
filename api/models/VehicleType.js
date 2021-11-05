class VehicleType extends Model {
  static get tableName() {
    return "country";
  }
}
class Vehicle extends Model {
  static get tableName() {
    return "vehicle";
  }
  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: VehicleType,
        join: {
          from: "vehicle.vehicle_id",
          to: "vehicletype.type",
        },
      },
    };
  }
}
