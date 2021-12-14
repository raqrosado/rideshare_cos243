exports.seed = function(knex, Promise) {
    return knex("drivers").del()
        .then(() => knex("user").del())
        .then(() => knex("user").insert([
            { id: 1, firstName: 'Timmy', lastName: 'Emill', email: 'hey@taylor.edu', password: 'my_password', phone: '4142321096', isAdmin: true },
            { id: 2, name: 'Andrew', lastName: 'Rice', email: 'anso@taylor.edu', password: 'his_password', phone: '4142321097', isAdmin: false  },
        ]));
};
