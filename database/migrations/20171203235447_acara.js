
exports.up = function(knex, Promise) {
  var init = knex.schema.createTableIfNotExists("acaras", function (t) {
            t.increments('id').notNull().unsigned().primary();
            t.string('name',200).notNull();
            t.text('description','longtext').notNull();
            t.date('tanggal').notNull();
            t.string('longitude', 255);
            t.string('latitude', 255);

            t.integer('category_id').notNull()
                   .unsigned()
                   .references('id')
                   .inTable('categories')
                   .onUpdate('CASCADE');

            t.integer('user_id').notNull()
                   .unsigned()
                   .references('idUser')
                   .inTable('users')
                   .onUpdate('CASCADE');

        });

  return Promise.all([init]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('acaras');
};
