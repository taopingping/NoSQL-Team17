var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var mongoose = require('mongoose');
var app = express();

//initialize ElasticSearch client
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/:search', function(req, res){
  console.log("Searched for: " + req.params.search);
  //set result
// TODO initialize ES client

  //initialize MongoDB client
  var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  // TODO setup database
  // Use connect method to connect to the Server
  /*MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");



    db.close();
  });*/
  var result = [{id: 1, doc:"a.doc", count: 3 }, {id: 2, doc: "b.doc", count: 2 }, {id: 3, doc: "c.txt", count: 1 }];
  res.send(result);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(1337);
console.log('Server running at localhost:1337/');

module.exports = app;
