exports.seed = function(knex, Promise) {
    return knex("user").del()
        .then(() => knex("user").del())
        .then(() => knex("user").insert([
            { id: 1, firstName: 'Raquel', lastName: 'Rosado', email: 'raquel_rosado@taylor.edu', password: 'my_password', phone: '4142321096', isAdmin: true },
            { id: 2, name: 'Marcos', lastName: 'Rosado', email: 'marcos_rosado@taylor.edu', password: 'his_password', phone: '4142321097', isAdmin: false  },
        ]));
};
