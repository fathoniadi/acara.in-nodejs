
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Musik'},
        {id: 2, name: 'Seni Tari'},
        {id: 3, name: 'Seni Rupa'},
        {id: 4, name: 'Theater'}
      ]);
    });
};
