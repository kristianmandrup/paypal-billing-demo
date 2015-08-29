// goes through each of the plans defined in model.js
module.exports = function createPlan(plan) {
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
