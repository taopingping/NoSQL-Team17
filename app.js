var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var multer = require("multer");
var fs = require('fs');
var textract = require('textract');
var app = express();
var upload = multer({ dest : './public/uploads'});
var dir = './public/uploads/';
var currentIndex = 1;
var allDocuments = [];
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.indices.delete({
    index: '_all'
}, function(err, res) {

    if (err) {
        console.error(err.message);
    }
});

//read all files when server starts
fs.readdir(dir, function(err, items) {
  if(err) {
    console.log("Could not read files from directory " + dir);
  }
  else {
    items.forEach(function(item) {
      var path = dir + item;
      textract.fromFileWithPath(path, function( err, text ) {
        if(err) {
          console.log("Could not parse file " + path);
    		}
        else {
          allDocuments.push({name: item, text: text});
          client.index({
      			index:'uploadedfiles',
      			type:'file',
      			id: currentIndex++,
      			body:{
      				name: item,
      				text: text
      			}
      		},function(error,response){
      			if(error) {
              console.log(error);
            }
      		});
        }
      });
    });
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ dest: './public/uploads/',
	rename: function (fieldname, filename) {
    return filename + Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    textract.fromFileWithPath(file.path, function( err, text ) {
      if(err) {
  			console.log("Could not parse file " + file.path);
  		}
      else {
        var len = dir.length - 2;
        allDocuments.push({name: file.path.substring(len), text: text});
    		client.index({
    			index:'uploadedfiles',
    			type:'file',
    			id: currentIndex++,
    			body:{
    				name: file.path.substring(len),
    				text: text
    			}
    		},function(error,response){
          if(error) {
            console.log(error);
          }
    		});
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

app.get('/', function(req,res) {
  var result = [];
  for (var i = 0; i < allDocuments.length; i++) {
    result.push({id: i+1, doc: allDocuments[i].name, count: 1});
  }
  res.render('index', { data: result });
})

app.get('/*', function(req, res){
  client.search({
		index: 'uploadedfiles',
  	type: 'file',
  	body: {
			 query: {
  			function_score: {
  				query: { match: { text: req.params[0]}},
          script_score: {
            script: _index['text'][req.params[0]].tf()
          }
  			}
  		}
		}
  }).then(function (resp) {
    console.log(resp);
		res.send(resp);
  }, function (err) {
    console.trace(err.message);
  });
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

app.listen(1337, function () {
  console.log('App listening at http://%s:%s', "localhost", 1337);
  console.log('Elasticsearch listening at http://%s:%s', "localhost", 9200);
});

module.exports = app;
