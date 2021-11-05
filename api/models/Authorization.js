class Driver extends Model {
    static get tableName() {
      return "driver";
    }
  }
class Vehicle extends Model {
  static get tableName() {
    return "vehicle";
  }
  static get relationMappings() {
    return {
      vehicles: {
        relation: Model.ManyToManyRelation,
        modelClass: Vehicle,
        join: {
          from: "vehicle.vehicle_id",
          through: {
            from: "authorization.driver_id",
            to: "authorization.vehicle_id",
          },
          to: "driver.driver_id",
        },
      },
    };
  }
}