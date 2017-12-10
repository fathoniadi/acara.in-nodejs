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

	router.post('/register', function(req, res, next){
		let email = req.body.email;
		let password = req.body.password;
		let cpassword = req.body.cpassword;
		let name = req.body.name;

		if(password != cpassword)
		{
			return res.send({status: 400, message: "Password dan Konfirmasi Password tidak sama"});
		}

		promise.resolve()
			   .then(function(){
			   	return [bcrypt.hash(password, 10), User.where("email", email).fetch()];
			   })
			   .spread(function(resultBcrypt, resultUser)
			   {
					if(resultUser)
					{
						return res.send({status: 400, message: "Email sudah terdaftar"});
					}			

				   	var user = {
	                    email : email,
		                password : resultBcrypt,
		                name: name
					};

					return new User().save(user);

			   })
			   .then(function(result){
			   		let data = result.toJSON()
					if(!result)
			   		{
			   			return res.json({status: 400, message: "Tidak bisa menyimpan data user baru"});
			   		}
					return res.send({status: 200})
			   })
			   // .catch(function(){
			   // 		return res.send(400);
			   // });
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