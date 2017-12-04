let db = require('../../vendor/database/bookshelf');

const Acara = db.Model.extend({
  tableName: 'acaras',
  idAttributte:'id',

});

module.exports = db.model('Acara', Acara);