var express = require('express');
var app = express();
// respond with "hello world" when a GET request is made to the homepage
var port = process.env.PORT || 3000;
var path = require('path');
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes/index');
app.use('/', routes);

app.get('/:date', function(req, res) {
  parseInt(req.params.date) ? req.params.date*=1000 : req.params.date;
  var dateNat = new Date(req.params.date);
  var dateUnix = Math.floor(dateNat.getTime()/1000);
  var date = {
    "unix" : dateUnix,
    "natural" : dateNat.toString() === "Invalid Date" ? null : monthNames[dateNat.getMonth()]+" "+dateNat.getDate()+", "+dateNat.getFullYear()
  }
  res.send(date);

});
app.listen(port, function(){
  console.log("Running on port: " + port);
});


module.exports = app;
