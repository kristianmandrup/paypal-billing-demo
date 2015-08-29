module.exports = function(plans){
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
}
