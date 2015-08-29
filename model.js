var firebase = require('firebase');

var return_url = process.env.APP_BASE_URL + process.env.APP_PAYPAL_SUCCESS_CALLBACK;
var cancel_url = process.env.APP_BASE_URL + process.env.APP_PAYPAL_CANCEL_CALLBACK;

var date = require('./util/date')

var firebaseRef = require('./backend/firebase')

//model object
module.exports = {
    'firebase': firebaseRef,
    'plans': {
        //defines the plans that are available
        "2999": require('./plans/regular'),
        '5999': require('./plans/premium'),
    },
    //defines the data required to activate the plan
    'activatePlan':[{
        "op": "replace",
        "path": '/',
        "value": {
            "state": "ACTIVE"
        }
    }],
    //creates billing agreement data based on the tier and address
    'createAgreementData': function(tier, planId, address){
        return {
            "name": tier == '2999'? "Regular Plan": "Premium Plan",
            "description": tier == '2999'? "Regular Plan": "Premium Plan",
            "start_date": date.startDate(),
            "plan":{
                "id": planId
            },
            "payer": {
                "payment_method": "paypal"
            },
            "shipping_address": require('./address/shipping')(address)
        }
    },
    //sample address
    'address': require('./address/sample')
}
