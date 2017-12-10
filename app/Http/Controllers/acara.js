let Acara = require('../Acara');
let Category = require('../Category');
let promise = require('bluebird');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let moment = require('moment');

module.exports = function (router)
{
	router.get('/', function(req, res, next){
		
		promise.all([Acara.fetchAll()])
				.then(function(result){
					let acaras = result[0].toJSON();

					if(acaras.length <= 0)
					{
						return res.send({status:404, message: "Acara tidak ada"});
					}

					return res.send({status: 200, acaras: acaras});
				});
	});


	router.get('/:id', function(req, res, next){
		let id = req.params.id;

		promise.resolve()
			   .then(function(){
			   	return Acara.where("id", id).fetch({withRelated: {'user' : function(query){
			   		//query.select(["name"]);
			   	}, 'category' : function(query){
			   		//query.get(['name']);
			   	}}});
			   })
			   .then(function(result){
			   	if(!result)
			   		return res.send({status: 400, message: "Data Acara tidak ada"});
			   	else
			   		return res.send({status:200, data: result.toJSON()})
			   });
	});



	router.post('/', function(req, res, next){
		let name = req.body.name;
		let description = req.body.description;
		let date = req.body.date;
		let category = req.body.category;
		let token = req.body.token;
		let longitude = req.body.longitude;
		let latitude = req.body.latitude;


		promise.resolve()
				.then(function(){
					return [jwt.verify(token, 'secret_key'), Category.where('name', category).fetch()];
				})
				.spread(function(resultJWT, resultCategory){
					if(resultCategory == null)
					{
						return res.send({status: 400, message: "Kategori event tidak ditemukan"});
					}

					let date_formated = moment(date, 'mm/DD/YYYY').format('YYYY-mm-DD');
					let data = {
						name: name,
						description: description,
						tanggal: date_formated,
						longitude: longitude,
						latitude: latitude,
						longitude: longitude,
						category_id: resultCategory.id,
						user_id: resultJWT.iduser,
					};

					return new Acara().save(data);
				})
				.then(function(result){
					let data = result.toJSON()
					if(!result)
			   		{
			   			res.json({status: 400, message: "Tidak bisa menyimpan data acara"});
			   		}

					return res.send({status: 200})
				});
	});

}