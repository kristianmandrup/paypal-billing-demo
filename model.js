var firebase = require('./backend/firebase')

var config = {
  return_url: process.env.APP_BASE_URL + process.env.APP_PAYPAL_SUCCESS_CALLBACK;
  cancel_url: process.env.APP_BASE_URL + process.env.APP_PAYPAL_CANCEL_CALLBACK;
};

var date = require('./util/date')
var plans = require('./plans')(config);

//model object
module.exports = {
    'plans': {
        //defines the plans that are available
        "Regular": plans.regular,
        'Premium': plans.premium
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
        var desc = tier == 'Regular'? "Regular Plan": "Premium Plan";

        return {
            "name": desc,
            "description": desc
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
