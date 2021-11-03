function tableBuilder(knex) {
    query1 = knex.createTable("vehicle", tbl => {
        tbl.increments("id").primary();
        tbl.string("make");
        tbl.string("model");
        tbl.string("color");
        tbl.integer("vehicleTypeId").references("id").inTable("vehicle_type");
        tbl.integer("capacity");
        tbl.float("mpg");
        tbl.integer("licenseState").references("abbreviation").inTable("state");
        tbl.string("licensePlate");
    })

    query2 = knex.createTable("driver", tbl => {
        tbl.increments("id").primary();
        tbl.integer("userId").references("id").inTable("user");
        tbl.string("licenseNumber");
        tbl.integer("licenseState").references("abbreviation").inTable("state");
    })

    query3 = knex.createTable("user", tbl => {
        tbl.increments("id").primary();
        tbl.string("firstName");
        tbl.string("lastName");
        tbl.string("email");
        tbl.string("password");
        tbl.string("phone");
        tbl.boolean("isAdmin");
    })

    query4 = knex.createTable("ride", tbl => {
        tbl.increments("id").primary();
        tbl.date("date");
        tbl.time("time");
        tbl.float("distance");
        tbl.float("fuelPrice");
        tbl.float("fee");
        tbl.integer("vehicleId").references("id").inTable("vehicle");
        tbl.integer("fromLocationId").references("id").inTable("location");
        tbl.integer("toLocationId").references("id").inTable("location");
    })
  }


  async function runQueries() {
    const knex = require("knex")({
      client: "pg",
      connection: {
        host: "pg.cse.taylor.edu",
        username: "raquel_rosado",
        password: "zewafoqo",
        database: "raquel_rosado",
      },
    });

    try {
        await tableBuilder(knex);
    } catch (err) {
        console.error(err);
    } finally {
        await knex.destroy();
    }
  }

  runQueries();
