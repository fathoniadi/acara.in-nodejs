'use strict';
var app = require('../../vendor/autoload.js');
var express = require('express');
var path = require('path');
var routes = [];

var route_api = '/api/';
var controllers_path = "../../app/Http/Controllers/";

module.exports.web= function(route_name, route_file_name)
{
	routes.push({"name":route_name,"file":route_file_name});
};

module.exports.api= function(route_name, route_file_name)
{
	routes.push({"name":route_api+route_name,"file":route_file_name});
};

module.exports.routing = function()
{
	for(let i=0; i < routes.length; i++)
	{
		var router = express.Router();
		var route_name = routes[i].name;

		require(controllers_path+routes[i].file+'.js')(router);
		app.use(route_name, router);	
	}
};
