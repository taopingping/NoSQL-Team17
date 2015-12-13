var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var elasticsearch = require('elasticsearch');
var multer = require("multer");
var fs = require('fs');
var textract = require('textract');
var app = express();
var upload = multer({ dest : './public/uploads'});
var dir = './public/uploads/';

// Store all files and their data
var uploads = [];
var docData = [];

//read all files when server starts
fs.readdir(dir, function(err, items) {
  if(err) {
    console.log("Could not read files from directory " + dir);
  }
  else {
    uploads = items;
    uploads.forEach(function(item) {
      var path = dir + item;
      textract.fromFileWithPath(path, function( err, text ) {
        if(err) {
    			console.log("Could not parse file " + path);
    		}
        else {
          var val = {
            name : item,
            data: text
          };
          docData.push(val);
        }
      });
    });
  }
});

require('dotenv').load();

var client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  log: 'trace'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use(multer({ dest: './public/uploads/',
	rename: function (fieldname, filename) {
    //add the current date to the filename to allow multiple uploads
    return filename + Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    //add the uploaded file to the stored files
    uploads.push(file);
    textract.fromFileWithPath(file.path, function( error, text ) {
      if(error) {
  			console.log("Could not parse file " + file.path);
  		}
      else {
        //add the uploaded file's text to the docData
        var len = dir.length - 2;
        var val = {
          name : file.path.substring(len),
          data: text
        };
        docData.push(val);
      }
    });
	}
}));

app.post('/upload',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.redirect('/');
	});
});

app.get('/:search', function(req, res){
  var result = [];
  var invalidItems = 0;
  for (var i = 0; i < docData.length; i++) {

    //Suchparameter req.params.search
    //add elasticsearch
    // Ergebnis: result

    if(!(stringStartsWith(docData[i].name,"."))) {
      var index = i + 1 - invalidItems;
      // Ergebnis einfügen
      result.push({id: index, doc: docData[i].name, count: 3});
    }
    else{
      invalidItems++;
    }
  }
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

app.listen(process.env.SRV_PORT);

module.exports = app;

function stringStartsWith (string, prefix) {
  var res;
  try {
    res = string.slice(0, prefix.length) == prefix;
  }
  catch(err) {
    res = false;
  }
    return res;
}
