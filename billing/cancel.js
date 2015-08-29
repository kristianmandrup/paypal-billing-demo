module.exports = function(req, res) {
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
}
