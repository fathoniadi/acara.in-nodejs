let Acara = require('../Acara');
let Category = require('../Category');
let promise = require('bluebird');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let bookshelf = require('../../../vendor/database/bookshelf');

module.exports = function (router)
{

	router.get('/cobawaktu', function(req, res, next){
		let date_start = moment().format('YYYY-MM-DD');
		let date_end = moment(date_start, 'YYYY-MM-DD').add('1', 'day').format('YYYY-MM-DD');
		res.json({date_start, date_end});
	})

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


	router.get('/:lat/:long', function(req, res, next){
		
		let lat = req.params.lat
		let long = req.params.long

		let keyword = req.query.keyword
		let date_start = req.query.date_start
		let date_end = req.query.date_end
		let category = req.query.category
		let max_distance = req.query.distance

		var qcategory = ""

		if(category)
		{
			qcategory = category
		}

		var start = moment().format('YYYY-MM-DD');
		var end = moment(start, 'YYYY-MM-DD').add('1', 'day').format('YYYY-MM-DD');

		if(date_start && date_end)
		{
			start = moment(date_start, 'MM/DD/YYYY').format('YYYY-MM-DD');
			end = moment(date_end, 'MM/DD/YYYY').format('YYYY-MM-DD');
		}

		var qkeyword = "";

		if(keyword)
		{
			qkeyword = keyword;
		}

		var distance = 25;

		if(max_distance)
		{
			distance = max_distance;
		}

		let query = "SELECT acaras.*, ( 3959 * acos( cos( radians("+lat+") )"+
		" * cos( radians( latitude ) ) * cos( radians( longitude ) - radians("+long+") ) "+
		"+ sin( radians("+lat+") ) * sin( radians( latitude ) ) ) )"+
		" AS distance FROM acaras where tanggal >= '"+start+"' and "+
		" tanggal < '"+end+"' and category_id in (select id from categories where name like '%"+qcategory+"%') and "+
		" name like '%"+qkeyword+"%' and description like '%"+qkeyword+"%'"
		" HAVING distance < "+distance+" ORDER BY distance LIMIT 0 , 20;"

		promise.all([bookshelf.knex.raw(query)])
				.then(function(result){
					let acaras = result[0][0];
					if(acaras.length <= 0)
					{
						return res.send({status:404, message: "Acara tidak ada"});
					}

					return res.send({status: 200, acaras: acaras});
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

					let date_formated = moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD');
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