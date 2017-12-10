let db = require('../../vendor/database/bookshelf');
let User = require("./User");
let Category = require("./Category");

const Acara = db.Model.extend({
  tableName: 'acaras',
  idAttributte:'id',
  user: function(){
  	return this.belongsTo(User, "user_id", "iduser")
  },
  category: function(){
  	return this.belongsTo(Category, "category_id")
  },

});

module.exports = db.model('Acara', Acara);