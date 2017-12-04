'use strict';

module.exports = function(route)
{
	route.web('/','index');
	route.web('/api/v1/auth', 'auth');
	route.web('/api/v1/category', 'categories');
	route.web('/api/v1/acara', 'acara');
}