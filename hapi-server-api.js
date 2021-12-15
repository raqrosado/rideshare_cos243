// Knex

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "pg.cse.taylor.edu",
    user: "raquel_rosado",
    password: "lajusobe",
    database: "raquel_rosado",
  },
});

// Objection
const objection = require("objection");
objection.Model.knex(knex);

// Models
const User = require("./models/User");
const Driver = require("./models/Driver");
const State = require("./models/State"); 
const Ride = require("./models/Ride");
const Location = require("./models/Location");
const Vehicle = require("./models/Vehicle");
const VehicleType = require("./models/VehicleType");
const Account = require("./models/Account");

// Hapi
const Joi = require("@hapi/joi");
const Hapi = require("@hapi/hapi");
const { beforeInsert } = require("./models/Account");

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  routes: {
    cors: true,
  },
});

async function init() {
  // Show routes at startup.
  await server.register(require("blipp"));

  // Output logging information.
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
    },
  });

  // Configure routes.
  server.route([
    {
      method: "GET",
      path: "/vehicles",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return Vehicle.query();
      },
    },
    {
      method: "POST",
      path: "/vehicles",
      config: {
        description: "Sign up your vehicle",
        validate: {
          payload: Joi.object({
            make: Joi.string().required(),
            model: Joi.string().required(),
            color: Joi.string().required(),
            vehicleTypeId: Joi.number().required(),
            capacity: Joi.number().integer().required(),
            mpg: Joi.number().required(),
            licenseState: Joi.string().required(),
            licensePlate: Joi.string().required(),        
          }),
        },
      },
      handler: async (request, h) => {
        const existingVehicle = await Vehicle.query()
          .where("licensePlate", request.payload.licensePlate)
          .first();
        if (existingVehicle) {
          return {
            ok: false,
            msge: `A vehicle with license plate '${request.payload.licensePlate}' is already signed up`,
          };
        }

        const newVehicle = await Vehicle.query().insert({
          make: request.payload.make,
          model: request.payload.model,
          color: request.payload.color,
          vehicleTypeId: request.payload.vehicleTypeId,
          capacity: request.payload.capacity,
          mpg: request.payload.mpg,
          licenseState: request.payload.licenseState,
          licensePlate: request.payload.licensePlate,
        });

        if (newVehicle) {
          return {
            ok: true,
            msge: `Created vehicle with license plate: '${request.payload.licensePlate}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create a new vehicle with license plate: '${request.payload.licensePlate}'`,
          };
        }
      },
    }, 
    {
      method: "PATCH",
      path: "/vehicles/{id}",
      options: {
        description: "Update an existing vehicle",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
          payload: Joi.object ({
            make: Joi.string(),
            model: Joi.string(),
            color: Joi.string(),
            capacity: Joi.number().integer(),
            mpg: Joi.number(),
            licensePlate: Joi.string(),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Vehicle.query().findById(request.params.id))) {
          return h.response(`Vehicle ${request.params.id} not found`).code(404);
        }
        return Vehicle.query()
          .findById(request.params.id)
          .patch(request.payload);
      }
    },
    {
      method: "DELETE",
      path: "/vehicles/{id}",
      options: {
        description: "Delete an existing vehicle",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Vehicle.query().findById(request.params.id))) {
          return h.response(`Vehicle ${request.params.id} not found`).code(404);
        }

        return Vehicle.query()
          .where("id", request.params.id)
          .first()
          .del();
      }
    },
    {
      method: "GET",
      path: "/rides",
      config: {
        description: "Retrieve all rides",
      },
      handler: (request, h) => {
        return Ride.query();
      },
    },
    {
      method: "POST",
      path: "/rides",
      config: {
        description: "Create a new ride",
        validate: {
          payload: Joi.object({
            date: Joi.string().required(),
            time: Joi.string().required(),
            distance: Joi.number().required(),
            fuelPrice: Joi.number().required(),
            fee: Joi.number().required(),
            vehicleId: Joi.number().integer().required(),
            fromLocationId: Joi.number().integer().required(),
            toLocationId: Joi.number().integer().required()
          }),
        },
      },
      handler: async (request, h) => {
        /*
        const existingRideDate = await Ride.query()
          .where("date", request.payload.date)
          .first();
        const existingRideTime = await Ride.query()
          .where("time", request.payload.time)
          .first();
        if (existingRideDate && existingRideTime) {
          return {
            ok: false,
            msge: `A ride with the date '${request.payload.date}' and time '${request.payload.time}' is already booked`,
          };
        }
        */

        const newRide = await Ride.query().insert({
          date: request.payload.date,
          time: request.payload.time,
          distance: request.payload.distance,
          fuelPrice: request.payload.fuelPrice,
          fee: request.payload.fee,
          vehicleId: request.payload.vehicleId,
          fromLocationId: request.payload.fromLocationId,
          toLocationId: request.payload.toLocationId,
        });

        if (newRide) {
          return {
            ok: true,
            msge: `Ride created`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create a new ride`,
          };
        }
      },
    }, 
    {
      method: "PATCH",
      path: "/rides/{id}",
      options: {
        description: "Update an existing ride",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
          payload: Joi.object ({
            date: Joi.string(),
            time: Joi.string(),
            distance: Joi.number(),
            fuelPrice: Joi.number(),
            fee: Joi.number(),
            vehicleId: Joi.number().integer(),
            fromLocationId: Joi.number().integer(),
            toLocationId: Joi.number().integer()
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Ride.query().findById(request.params.id))) {
          return h.response(`Ride ${request.params.id} not found`).code(404);
        }
        return Ride.query()
          .findById(request.params.id)
          .patch(request.payload);
      }
    },
    {
      method: "DELETE",
      path: "/rides/{id}",
      options: {
        description: "Delete an existing ride",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Ride.query().findById(request.params.id))) {
          return h.response(`Ride ${request.params.id} not found`).code(404);
        }

        return Ride.query()
          .where("id", request.params.id)
          .first()
          .del();
      }
    },
    {
      method: "GET",
      path: "/vehicle-types",
      config: {
        description: "Retrieve all vehicle types",
      },
      handler: (request, h) => {
        return VehicleType.query();
      },
    },
    {
      method: "POST",
      path: "/vehicle-types",
      config: {
        description: "Create a new vehicle type",
        validate: {
          payload: Joi.object({
            vehicleType: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingVehicleType = await VehicleType.query()
          .where("vehicleType", request.payload.vehicleType)
          .first();
        if (existingVehicleType) {
          return {
            ok: false,
            msge: `The vehicle type '${request.payload.vehicleType}' already exists`,
          };
        }

        const newVehicleType = await VehicleType.query().insert({
          vehicleType: request.payload.vehicleType,
        });

        if (newVehicleType) {
          return {
            ok: true,
            msge: `Vehicle type created`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create a new vehicle type`,
          };
        }
      },
    }, 
    {
      method: "PATCH",
      path: "/vehicle-types/{id}",
      options: {
        description: "Update an existing vehicle type",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
          payload: Joi.object ({
            vehicleType: Joi.string(),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await VehicleType.query().findById(request.params.id))) {
          return h.response(`Vehicle Type ${request.params.id} not found`).code(404);
        }
        return VehicleType.query()
          .findById(request.params.id)
          .patch(request.payload);
      }
    },
    {
      method: "DELETE",
      path: "/vehicle-types/{id}",
      options: {
        description: "Delete an existing vehicle type",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await VehicleType.query().findById(request.params.id))) {
          return h.response(`Ride ${request.params.id} not found`).code(404);
        }

        return VehicleType.query()
          .where("id", request.params.id)
          .first()
          .del();
      }
    },
    {
      method: "GET",
      path: "/drivers",
      config: {
        description: "Retrieve all drivers",
      },
      handler: (request, h) => {
        return Driver.query();
      },
    },
    {
      method: "POST",
      path: "/drivers",
      config: {
        description: "Sign up as a driver",
        validate: {
          payload: Joi.object({
            userId: Joi.number().required(),
            licenseNumber: Joi.string().required(),
            licenseState: Joi.string().required()
          }),
        },
      },
      handler: async (request, h) => {
        const existingDriver = await Driver.query()
          .where("licenseNumber", request.payload.licenseNumber)
          .first();
        if (existingDriver) {
          return {
            ok: false,
            msge: `A driver with license plate '${request.payload.licenseNumber}' is already signed up`,
          };
        }

        const newDriver = await Driver.query().insert({
          userId: request.payload.userId,
          licenseNumber: request.payload.licenseNumber,
          licenseState: request.payload.licenseState,
        });

        if (newDriver) {
          return {
            ok: true,
            msge: `Created driver with license plate: '${request.payload.licenseNumber}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create a new driver with license plate: '${request.payload.licenseNumber}'`,
          };
        }
      },
    }, 
    {
      method: "PATCH",
      path: "/drivers/{id}",
      options: {
        description: "Update an existing driver",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
          payload: Joi.object ({
            userId: Joi.number(),
            licenseNumber: Joi.string(),
            licenseState: Joi.string(),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Driver.query().findById(request.params.id))) {
          return h.response(`Driver ${request.params.id} not found`).code(404);
        }
        return Driver.query()
          .findById(request.params.id)
          .patch(request.payload);
      }
    },
    {
      method: "DELETE",
      path: "/drivers/{id}",
      options: {
        description: "Delete an existing driver",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Driver.query().findById(request.params.id))) {
          return h.response(`Driver ${request.params.id} not found`).code(404);
        }

        return Driver.query()
          .where("id", request.params.id)
          .first()
          .del();
      }
    },
    {
      method: "GET",
      path: "/users",
      config: {
        description: "Retrieve all users",
      },
      handler: (request, h) => {
        return User.query();
      },
    },
    {
      method: "POST",
      path: "/users",
      config: {
        description: "Create a new user",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            isAdmin: Joi.boolean().required(),       
          }),
        },
      },
      handler: async (request, h) => {
        const existingUser = await User.query()
          .where("email", request.payload.email)
          .first();
        if (existingUser) {
          return {
            ok: false,
            msge: `A user with email '${request.payload.email}' is already signed up`,
          };
        }

        const newUser = await User.query().insert({
          firstName: request.payload.firstName,
          lastName: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
          phone: request.payload.phone,
          isAdmin: request.payload.isAdmin,
        });

        if (newUser) {
          return {
            ok: true,
            msge: `Created user with email: '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create a new user with email: '${request.payload.email}'`,
          };
        }
      },
    }, 
    {
      method: "GET",
      path: "/users/{id}",
      options: {
        description: "Retrieve user by ID",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: (request, h) => {
        return User.query()
          .where("id", request.params.id)
          .first();
      },
    },
    {
      method: "POST",
      path: "/users/{userId}/rides/{rideId}",
      options: {
        description: "Add a passenger to a ride",
        validate: {
          params: Joi.object ({
            userId: Joi.number().integer().min(1),
            rideId: Joi.number().integer().min(1),
          }),
        },
      },
      handler: (request, h) => {
        return User.query()
          .where("userId", request.params.userId)
          .where("rideId", request.params.rideId)
          .first();
      },
    },
    {
      method: "DELETE",
      path: "/users/{userId}/rides/{rideId}",
      options: {
        description: "Delete an existing passenger",
        validate: {
          params: Joi.object ({
            id: Joi.number().integer().min(1),
          }),
        },
      },
      handler: async (request, h) => {
        if (!(await Vehicle.query().findById(request.params.id))) {
          return h.response(`Vehicle ${request.params.id} not found`).code(404);
        }

        return Vehicle.query()
          .where("id", request.params.id)
          .first()
          .del();
      }
    },
    {
      method: "POST",
      path: "/accounts",
      config: {
        description: "Sign up for an account",
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' is already in use`,
          };
        }

        const newAccount = await Account.query().insert({
          first_name: request.payload.firstName,
          last_name: request.payload.lastName,
          email: request.payload.email,
          password: request.payload.password,
        });

        if (newAccount) {
          return {
            ok: true,
            msge: `Created account '${request.payload.email}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create account with email '${request.payload.email}'`,
          };
        }
      },
    },

    {
      method: "PUT",
      path: "/reset-password",
      config: {
        description: "Reset password",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            oldpassword: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingAccount = await Account.query()
          .where("email", request.payload.email)
          .first();
        const oldPassword = await Account.query()
          .where("password", request.payload.password)
          .first();

        if (!existingAccount) {
          return {
            ok: false,
            msge: `Account with email '${request.payload.email}' does not exist`,
          };
        }

        if (
          existingAccount &&
          (await existingAccount.verifyOldPassword(request.payload.oldpassword))
        ) {
          const updatedAccount = await Account.query()
            .update()
            .where(
              "email",
              request.payload.email
            )({
            password: request.payload.password,
          });
          return {
            ok: true,
            msge: `Successful '${request.payload.email}'`,
            details: {
              id: updatedAccount.id,
              firstName: updatedAccount.first_name,
              lastName: updatedAccount.last_name,
              email: updatedAccount.email,
              password: request.payload.password,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },
    {
      method: "GET",
      path: "/accounts",
      config: {
        description: "Retrieve all accounts",
      },
      handler: (request, h) => {
        return Account.query();
      },
    },

    {
      method: "DELETE",
      path: "/accounts/{id}",
      config: {
        description: "Delete an account",
      },
      handler: (request, h) => {
        return Account.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted account with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete account with ID '${request.params.id}'`,
              };
            }
          });
      },
    },

    {
      method: "POST",
      path: "/login",
      config: {
        description: "Log in",
        validate: {
          payload: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          }),
        },
      },
      handler: async (request, h) => {
        const account = await Account.query()
          .where("email", request.payload.email)
          .first();
        if (
          account &&
          (await account.verifyPassword(request.payload.password))
        ) {
          return {
            ok: true,
            msge: `Logged in successfully as '${request.payload.email}'`,
            details: {
              id: account.id,
              firstName: account.first_name,
              lastName: account.last_name,
              email: account.email,
            },
          };
        } else {
          return {
            ok: false,
            msge: "Invalid email or password",
          };
        }
      },
    },
    {
      method: "POST",
      path: "/Location",
      config: {
        description: "Create a new location",
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipCode: Joi.string().required(),
          }),
        },
      },
      handler: async (request, h) => {
        const existingLocation = await Location.query()
          .where("name", request.payload.name)
          .first();
        if (existingLocation) {
          return {
            ok: false,
            msge: `Location with name '${request.payload.name}' already exists`,
          };
        }
        name;
        address;
        city;
        state;
        zipCode;
        const newLocation = await Location.query().insert({
          name: request.payload.name,
          address: request.payload.address,
          city: request.payload.city,
          state: request.payload.state,
          zipCode: request.payload.zipCode,
        });
        if (newLocation) {
          return {
            ok: true,
            msge: `Created location '${request.payload.name}'`,
          };
        } else {
          return {
            ok: false,
            msge: `Couldn't create location with name '${request.payload.name}'`,
          };
        }
      },
    },
    {
      method: "GET",
      path: "/Location",
      config: {
        description: "List all Location",
      },
      handler: (request, h) => {
        return Location.query();
      },
    },
    {
      method: "DELETE",
      path: "/Location/{id}",
      config: {
        description: "Delete a location",
      },
      handler: (request, h) => {
        return Location.query()
          .deleteById(request.params.id)
          .then((rowsDeleted) => {
            if (rowsDeleted === 1) {
              return {
                ok: true,
                msge: `Deleted location with ID '${request.params.id}'`,
              };
            } else {
              return {
                ok: false,
                msge: `Couldn't delete location with ID '${request.params.id}'`,
              };
            }
          });
      },
    },
  ]);

  
  // Start the server.
  await server.start();
}

// Go!
init();
