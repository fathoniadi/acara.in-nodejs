
exports.up = function(knex, Promise) {
  var init = knex.schema.createTableIfNotExists("users", function (t) {
            t.increments('iduser').notNull().unsigned().primary();
            t.string('email',100).notNull();
            t.unique('email');
            t.string('password',100).notNull();
            t.string('name',200).notNull();
        });

  return Promise.all([init]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
