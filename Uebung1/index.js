var express = require('express');
var app = express();
var ClientPort = 6379;
var serverPort = 8000;

/* GET home page. */
var redis = require('redis');
var client = redis.createClient(ClientPort, "127.0.0.1");

client.on('connect', function () {
    client.set('hochschule:professor', 'Thomas Smits');
    client.set('hochschule:fak', 'Informatik');
    client.set('hochschule:insititut', 'Robotik');
    client.set('Robotik:professor', 'Thomas Ihme');
    client.set('AE:professor', 'Christoph Martin');
    client.set('hochschule:AE', 'Emily');
    client.set('hochschule:katze', 'Morle');
    client.set('AE:katze', 'Martina');

});

client.on('error', function (err) {
    console.log(err);
})


app.get('*', function (req, res) {
    var url = req.url.substr(1); //'/test'
    console.log(url);
    if (!url)
        res.send('Hello World');
    else {
        client.get(url, function (err, value) {
            if(value == null)
                res.send('Key not found');
            else
                res.send(value);
        });
    }
});

var server = app.listen(serverPort, function () {
    var host = "localhost";
    var port = serverPort;
})
