const { Model } = require('objection');


class Driver extends Model {
    static get tableName() {
      return "driver";
    }
  }
class Ride extends Model {
  static get tableName() {
    return "ride";
  }
  static get relationMappings() {
    return {
      rides: {
        relation: Model.ManyToManyRelation,
        modelClass: Ride,
        join: {
          from: "ride.ride_id",
          through: {
            from: "drivers.driver_id",
            to: "drivers.ride_id",
          },
          to: "driver.driver_id",
        },
      },
    };
  }
}

module.exports = { Driver, Ride };