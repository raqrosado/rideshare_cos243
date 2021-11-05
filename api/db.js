const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'pg.cse.taylor.edu',
        user: 'raquel_rosado',
        password: 'zewafoqo',
        database: 'raquel_rosado'
    }
});
    
objection = require('objection');
const Model = objection.Model;
Model.knex(knex);
    