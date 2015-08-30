var express = require('express');
var app = express();
var model = require('./model.js');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': process.env.PAYPAL_MODE, //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

//tells the server to look into the /public folder for the static content
app.use(express.static(__dirname + '/public'));

var backend = require('/backend/firebase');

var routes = require('./routes');

var cancel = require('./billing/cancel');
var start = require('./billing/start');
routes.plan.mount(app, {cancel: cancel, start: start}, {backend: backend});

var create = require('./billing/create');
var initiate = require('./billing/initiate');
routes.billing.mount(app, {create: create, initiate: initiate}, , {backend: backend});

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at %s:%s', host, port);
})
