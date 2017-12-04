let db = require('../../vendor/database/bookshelf');

const Category = db.Model.extend({
  tableName: 'categories',
  idAttributte:'id',

});

module.exports = db.model('Category', Category);