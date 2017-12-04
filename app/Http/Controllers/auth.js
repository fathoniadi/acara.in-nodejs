let User = require('../User');
let promise = require('bluebird');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
module.exports = function (router)
{
	router.get('/login', function(req, res, next){
		
		promise.all([User.fetchAll()])
				.then(function(users){
					res.json(users);
				});
	});

	router.post('/login', function(req, res, next){
		let email = req.body.email;
		let password = req.body.password;

		promise.resolve()
			   .then(function(){
			   		return User.where('email', email).fetch();
			   	})
			   .then(function(result){
			   		if(result === null)
			   		{
			   			res.json({status: 404, message: "Email tidak terdaftar"});
			   		}
			   		let data = result.toJSON();
			   		return [bcrypt.compare(password, data.password), data];
			   })
			   .spread(function(result, data){
			   		if(!result)
			   		{
			   			res.json({status: 404, message: "Password Salah"});
			   		}

			   		var token = jwt.sign(data, 'secret_key');
			   		res.send({status: 200, token: token});

			   }).catch(function(){
			   	res.send(404);
			   });
	});

}