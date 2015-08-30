module.exports = function(config) {
  return {
    "description": "Premium Plan",
    "merchant_preferences": {
        "auto_bill_amount": "yes",
        "cancel_url": config.cancel_url,
        "initial_fail_amount_action": "continue",
        "max_fail_attempts": "1",
        "return_url": config.return_url,
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
}
