let Category = require('../Category');
let promise = require('bluebird');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

module.exports = function (router)
{
	router.get('/', function(req, res, next){
		
		promise.all([Category.fetchAll()])
				.then(function(result){
					// if(categories)
					let categories = result[0].toJSON();

					if(categories.length <= 0)
					{
						return res.send({status:404, message: "Category tidak ada"});
					}

					return res.send({status: 200, categories: categories});
					//res.send(categories.toJSON());
				});
	});



}