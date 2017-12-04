require('dotenv').config();
/*var fs = require('fs');
if(fs.existsSync('.env')) console.log('Ada');

if(!process.env.LISTEN_PORT) process.env.LISTEN_PORT=7000;
if(!process.env.NODE_ENV) process.env.NODE_ENV="development";*/

var express = require('express');
var app = express();

module.exports = app;