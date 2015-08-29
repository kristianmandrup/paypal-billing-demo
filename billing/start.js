module.exports = function(req, res) {
  //starts the billingAgreement and collects the money
  paypal.billingAgreement.execute(req.query.token, {}, function(error, agreement){
      if(error){
          throw error;
      }
      else {
          res.json({'status':'success', 'data': agreement});
      }
  });
}
