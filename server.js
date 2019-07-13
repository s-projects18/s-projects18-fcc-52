// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//  ------ project stuff -------------
// get request-metadata
// https://expressjs.com/de/api.html
//
// IP-address
// req.ip: Contains the remote IP address of the request
// - ::ffff:127.0.0.1 -> proxy
// - requires: app.set('trust proxy', true);
// see: https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
// ["client", "proxy1", "proxy2"] -> returns proxy2 (without trust proxy)!
app.set('trust proxy', true); 

// preferred languages (from header Accept-Language)
// req.get(): Returns the specified HTTP request header field

app.get("/api/whoami", function (req, res) {
  res.json(
    {ipaddress: req.ip,
     language: req.get('Accept-Language'),
     software: req.get('User-Agent')
    } 
  );
});

// check: compare with example solution:
// {"ipaddress":"88.130.55.230","language":"de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7","software":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3833.0 Safari/537.36"}
// {"ipaddress":"88.130.55.230","language":"de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7","software":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3833.0 Safari/537.36"}

//  ------ project stuff -------------


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
