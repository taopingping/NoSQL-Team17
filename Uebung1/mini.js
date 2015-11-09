/**
 * Created by Thea on 09.11.15.
 */
var http = require('http');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

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

http.createServer(function(req, res){
    var url = req.url.substr(1); //'/test'
    console.log(url);
    if (!url)
        res.end('Hello World');
    else {
        client.get(url, function (err, value) {
            if(value == null)
                res.end('Hello World');
            else
                res.end(value);
        });
    }
}).listen(3500, '127.0.0.1');