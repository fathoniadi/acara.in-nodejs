let bcrypt = require('bcrypt')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });

  // return Promise.all([bcrypt.hash("kucinglucu", 10)])
  //               .then(function(hash){
  //                 var user = {
  //                   idUser : 1,
  //                   email : "fathon.adi@gmail.com",
  //                   password : hash[0],
  //                   name: "Fathoni Adi Kurniawan"
  //                 };

  //                 return knex("users").insert(user);
  //               });
};
