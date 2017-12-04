
module.exports = function (router)
{
	router.get('/', function(req, res, next){
		res.render('index',{title:'Simple MVC look like Laravel'});
	});

}