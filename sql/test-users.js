exports.seed = function(knex, Promise) {
    return knex("user").del()
        .then(() => knex("user").del())
        .then(() => knex("user").insert([
            { id: 1, firstName: 'Alex', lastName: 'Weird', email: 'yee@taylor.edu', password: 'my_password', phone: '4142321096', isAdmin: true },
            { id: 2, name: 'Richard', lastName: 'Patt', email: 'woo@taylor.edu', password: 'his_password', phone: '4142321097', isAdmin: false  },
        ]));
};
