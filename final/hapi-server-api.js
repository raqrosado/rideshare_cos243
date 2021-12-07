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
const Vehicle = require("./models/Vehicle");
const Location = require("./models/Location");


const Driver = require("./models/Driver");
const User = require("./models/User");
const Ride = require("./models/Ride");
const State = require("./models/State");
const VehicleTyle = require("./models/VehicleTyle");
const Authorization = require("./models/Authorization");
const Drivers = require("./models/Drivers");
const Passenger = require("./models/Passenger");


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
      method: "POST",
      path: "/vehicle",
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
          .where("email", request.payload.email)({
            password: request.payload.password
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
  ]);

  // Start the server.
  await server.start();
}

// Go!
init();
