let db = require('../../vendor/database/bookshelf');

const User = db.Model.extend({
  tableName: 'users',
  idAttributte:'iduser',
  // actionHistory: function()
  // {
  // 	return this.hasMany("actionhistory","iduser");
  // },
  // quotaHistory: function()
  // {
  // 	return this.hasMany("quotahistory","iduser");
  // }

});

module.exports = db.model('User', User);