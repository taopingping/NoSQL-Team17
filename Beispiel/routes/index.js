var express = require('express');
var router = express.Router();
var port = 6379;

/* GET home page. */
var redis = require('redis');
var client = redis.createClient(port,"127.0.0.1");

client.on('connect', function() {
  client.set('test', '123');
});

client.on('error', function(err){
    console.log(err);
})


router.get('*', function(req, res) {
  var url = req.url.substr(1); //'/test'
  if (!url)
    res.render('index', { title: 'Hello World' });
    else {
      client.get(url, function(err, value) {
          res.render('index', { title: value });
      });
  }
});

module.exports = router;

