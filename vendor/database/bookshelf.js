'use strict';
const config = require('../../knexfile.js');
console.log(config);
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
bookshelf.plugin('pagination');
module.exports = bookshelf;
