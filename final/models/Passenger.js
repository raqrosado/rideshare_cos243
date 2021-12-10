const { Model } = require('objection');

class User extends Model {
    static get tableName() {
      return "user";
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
            from: "passenger.user_id",
            to: "passenger.ride_id",
          },
          to: "user.user_id",
        },
      },
    };
  }
}

module.exports = { User, Ride };