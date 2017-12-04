
exports.up = function(knex, Promise) {
  var init = knex.schema.createTableIfNotExists("categories", function (t) {
            t.increments('id').notNull().unsigned().primary();
            t.string('name',200).notNull();
        });

  return Promise.all([init]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories');
};
