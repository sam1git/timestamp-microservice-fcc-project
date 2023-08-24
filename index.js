// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// return JSON object with unix key (Number) and utc key (String)
app.get('/api/:date?', function(req,res) {
  let input = req.params.date;
  let date;
  if (Number.isFinite(+input)) {
    date = new Date(+input);
  } else if (input === undefined) {
    date = new Date();
  } else {
    date = new Date(input);
  }
  if (isNaN(date)) {
    res.json({"error": "Invalid Date"});
  } else {
    let unix = Math.floor(date.getTime());
    let utc = date.toUTCString();
    res.json({"unix": unix,"utc": utc});
  };
});