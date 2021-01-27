const connection = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = require('knex')(connection)

module.exports = {
    getAll(){
        return database.select().table('person').then(rows => rows);
    },

    getById(id) {
        return database
          .from("person")
          .select("*")
          .where("id", id)
          .first();
    },

    insert(newUser) {
        return database
            .insert(newUser)
            .into("person")
            .returning("*")
            .then(rows => {
            return rows[0];
            });
    },
    delete(id) {
        return database
          .where({ id })
          .delete()
          .table('person');
    },
    update(id, userFields) {
        return database
          .where({ id })
          .update(userFields)
          .table('person');
    }
};