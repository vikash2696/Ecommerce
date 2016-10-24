
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require("body-parser");
//var app = module.exports = express.createServer();
//var app = module.exports = express();
var index = require('./controller/indexcontroller');
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var path = require('path');
var multer = require('multer');
// var flash = require('connect-flash');
var session = require('express-session');
var cookieSession = require('cookie-session');
/* 
 * 
 * test*/
var app = module.exports = express.createServer(),
io = require('socket.io').listen(app),
parser = new require('xml2json'),
fs = require('fs');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/uploads'));
app.use(express.bodyParser({uploadDir:'/uploads'}));

app.use(function(req, res, next) { 
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
	next(); 
});
app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.get('/',  function(req, res) {

	var title = 'Learning node';	
	res.redirect('/index');
	
});
// used to fetch home page data
app.get('/index', index.fetchHomePageData);
app.get('/login',index.login);
app.listen(3014, function() {
	console.log("Express server listening on port %d in %s mode",
			app.address().port, app.settings.env);
});
