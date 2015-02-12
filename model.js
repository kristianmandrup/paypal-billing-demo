var firebase = require('firebase');

var return_url = "http://ulkkbc1e933e.laurenceputra.koding.io:3000/payment/execute/";
var cancel_url = "http://ulkkbc1e933e.laurenceputra.koding.io:3000/payment/cancel/";

var firebaseRef = new firebase('https://smu-paypal-demo.firebaseio.com');
firebaseRef.authWithCustomToken(process.env.FIREBASE_TOKEN, function(error, authData){
    if(error){
        throw "Firebase Auth Failed for server!";
    }
});

var start_date = new Date();
start_date.setMinutes(start_date.getMinutes() + 5);

module.exports = {
    'firebase': firebaseRef,
    'plans': {
        "2999": {
            "description": "Regular Plan",
            "merchant_preferences": {
                "auto_bill_amount": "yes",
                "cancel_url": cancel_url,
                "initial_fail_amount_action": "continue",
                "max_fail_attempts": "1",
                "return_url": return_url,
                "setup_fee": {
                    "currency": "SGD",
                    "value": "0"
                }
            },
            "name": "Regular Plan",
            "payment_definitions": [
                {
                    "amount": {
                        "currency": "SGD",
                        "value": "29.99"
                    },
                    "cycles": "0",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "name": "Regular 1",
                    "type": "REGULAR"
                },
                {
                    "amount": {
                        "currency": "SGD",
                        "value": "19.99"
                    },
                    "cycles": "1",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "name": "Trial 1",
                    "type": "TRIAL"
                }
            ],
            "type": "INFINITE"
        },
        '5999': {
            "description": "Premium Plan",
            "merchant_preferences": {
                "auto_bill_amount": "yes",
                "cancel_url": cancel_url,
                "initial_fail_amount_action": "continue",
                "max_fail_attempts": "1",
                "return_url": return_url,
                "setup_fee": {
                    "currency": "SGD",
                    "value": "0"
                }
            },
            "name": "Premium Plan",
            "payment_definitions": [
                {
                    "amount": {
                        "currency": "SGD",
                        "value": "59.99"
                    },
                    "cycles": "0",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "name": "Premium 1",
                    "type": "REGULAR"
                },
                {
                    "amount": {
                        "currency": "SGD",
                        "value": "39.99"
                    },
                    "cycles": "1",
                    "frequency": "MONTH",
                    "frequency_interval": "1",
                    "name": "Trial 2",
                    "type": "TRIAL"
                }
            ],
            "type": "INFINITE"
        }  
    },
    'activatePlan':[{
        "op": "replace",
        "path": '/',
        "value": {
            "state": "ACTIVE"
        }
    }],
    'createAgreementData': function(tier, planId, address){
        return {
            "name": tier == '2999'? "Regular Plan": "Premium Plan",
            "description": tier == '2999'? "Regular Plan": "Premium Plan",
            "start_date": toIsoString(start_date),
            "plan":{
                "id": planId
            },
            "payer": {
                "payment_method": "paypal"
            },
            "shipping_address":{
                "line1": address["line1"] ? address["line1"]:"",
                "line2": address["line2"] ? address["line2"]:"",
                "city": address["city"] ? address["city"]:"",
                "state": address["state"] ? address["state"]:"",
                "postal_code": address["postal_code"] ? address["postal_code"]:"",
                "country_code": address["country_code"] ? address["country_code"]:""
            }
        }
    },
    'address':{
        'line1': '1 Temasek Avenue',
        'line2': '#14-01',
        'city': 'Singapore',
        'state': 'Singapore',
        'postal_code': '039192',
        'country_code': 'SG'
    }
}

function PadZeros(value, desiredStringLength){
    var num = value + "";
    while (num.length < desiredStringLength){
        num = "0" + num;
    }
    return num;
}
function toIsoString(d){
    return d.getUTCFullYear() + '-' + PadZeros(d.getUTCMonth() + 1, 2) + '-' + PadZeros(d.getUTCDate(), 2) + 'T' + PadZeros(d.getUTCHours(), 2) + ':' + PadZeros(d.getUTCMinutes(), 2) + ':' + PadZeros(d.getUTCSeconds(), 2) + 'Z';
}