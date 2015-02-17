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

//Creates the plans based on what is defined in model.js. 
app.get('/payment/create-plan', function (req, res) {
    var plans = Object.keys(model.plans);
    for(var i = 0; i < plans.length; i++){
        //goes through each of the plans defined in model.js
        var plan = model.plans[plans[i]];
        paypal.billingPlan.create(plan, function(error, billingPlan){
            //creates the plan
            if(error){
                throw error;
            }
            //activates the plan
            paypal.billingPlan.update(billingPlan.id, model.activatePlan, function(error, response){
                if(error){
                    throw error;
                }
                var plan = "";
                //sets the plan id based on the plan name sent to PayPal
                if(billingPlan.name == "Regular Plan"){
                    plan = "2999";
                }
                else{
                    plan = "5999";
                }
                //stores the PayPal Plan ID to your plan id mapping in Firebase
                model.firebase.child('/plans').child('/' + plan).set({'id': billingPlan.id});
            });
        });
    }
    res.json({'status':'success'});
})

//initiate payment for a plan id
app.get('/payment/initiate/:planId', function (req, res) {
    // TODO: initiate a session with the users, with an id to identify the user
    var planId = req.params.planId;
    model.firebase.child('/plans').on('value', function(plans){
        //gets all the plans from Firebase
        plans = plans.val();
        //checks if the plan exists in Firebase
        if(plans[planId]){
            //if the plan exists, create a BillingAgreement payload using the planid that is passed in
            var billingAgreement = model.createAgreementData(planId, plans[planId].id, model.address);
            paypal.billingAgreement.create(billingAgreement, function(error, agreement){
                //creates the billing agreement
                if(error){
                    throw error;
                }
                //if creating the billing agreement is successful, find the approval url and redirect the user to it
                for(var i = 0; i < agreement.links.length; i++){
                    if(agreement.links[i].rel == 'approval_url'){
                        res.redirect(agreement.links[i].href);
                        return;
                    }
                }
                //if approval_url is not found, throw an error
                res.json({'status': 'failed'});
                throw "approval_url not found";
            });
        }
        else{
            //return failed if plan is not found
            res.json({'status': 'failed', 'desc': 'plan not found'});
        }
    });
});

//execute payment for plan. this endpoint is called when the user has paided via PayPal
app.get('/payment/execute/', function (req, res) {
    // TODO: using information in the session, and agreement ID, store the information in Firebase
    //checks if there is a token
    if(req.query.token){
        //starts the billingAgreement and collects the money
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

//cancels a specific agreement
app.get('/payment/cancel/:agreementId', function(req, res){
    var cancel_note = {'note':'cancel'};
    //does the actual cancel but returns only a http response code 204 if successful
    paypal.billingAgreement.cancel(req.params.agreementId, cancel_note, function (error, response) {
        if (error) {
            throw error;
        } 
        else {
            //check to see if it is really cancelled
            paypal.billingAgreement.get(req.params.agreementId, function(error, agreement){
                if(error){
                    throw error;
                }
                //if cancelled, agreement.state == "Cancelled"
                res.json({'status':'success', 'data': agreement});
            });
        }
    });
})

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at %s:%s', host, port);
})