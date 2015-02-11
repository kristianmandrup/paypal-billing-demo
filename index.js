var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.get('/payment/create-plan', function (req, res) {
  res.send('Create Plan');
})

app.get('/payment/initiate/:planId', function (req, res) {
  res.send('Initiate Agreement ' + req.params.planId);
})

app.get('/payment/execute/', function (req, res) {
  res.send('Execute Agreement');
})

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('app listening at %s:%s', host, port);

})