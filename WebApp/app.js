
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
//routes
var routes = require('./routes/index');
var reports = require('./routes/reports');

var app = express();
var connection  = require('express-myconnection'); 

app.engine('html', require('ejs').renderFile);

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', routes.index);
app.get('/investments', reports.investments);
app.get('/acquisitions', reports.acquisitions);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
