var express = require('express');
var app = express();
var model = require('./model.js');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': process.env.PAYPAL_MODE, //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
app.use(express.static(__dirname + '/public'));
app.get('/payment/create-plan', function (req, res) {
    var plans = Object.keys(model.plans);
    for(var i = 0; i < plans.length; i++){
        var plan = model.plans[plans[i]];
        paypal.billingPlan.create(plan, function(error, billingPlan){
            if(error){
                throw error;
            }
            paypal.billingPlan.update(billingPlan.id, model.activatePlan, function(error, response){
                if(error){
                    throw error;
                }
                var plan = "";
                if(billingPlan.name == "Regular Plan"){
                    plan = "2999";
                }
                else{
                    plan = "5999";
                }
                model.firebase.child('/plans').child('/' + plan).set({'id': billingPlan.id});
            });
        });
    }
    res.json({'status':'success'});
})

app.get('/payment/initiate/:planId', function (req, res) {
    var planId = req.params.planId;
    model.firebase.child('/plans').on('value', function(plans){
        plans = plans.val();
        if(plans[planId]){
            var billingAgreement = model.createAgreementData(planId, plans[planId].id, model.address);
            paypal.billingAgreement.create(billingAgreement, function(error, agreement){
                if(error){
                    throw error;
                }
                for(var i = 0; i < agreement.links.length; i++){
                    if(agreement.links[i].rel == 'approval_url'){
                        res.redirect(agreement.links[i].href);
                        return;
                    }
                }
                res.json({'status': 'failed'});
                throw "approval_url not found";
            });
        }
        else{
            res.json({'status': 'failed', 'desc': 'plan not found'});
        }
    });
});

app.get('/payment/execute/', function (req, res) {
    if(req.query.token){
        paypal.billingAgreement.execute(req.query.token, {}, function(error, agreement){
            if(error){
                throw error;
            }
            else{
                res.json({'status':'success', 'data': agreement});
            }
        });
    }
    else{
        res.json({'status':'failed'})
    }
})

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at %s:%s', host, port);

})