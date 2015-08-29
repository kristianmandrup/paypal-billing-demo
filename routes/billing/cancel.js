var cancelBilling = require('../../billing/cancel');

module.exports = function (app) {
  //cancels a specific agreement
  app.get('/payment/cancel/:agreementId', function(req, res) {
      var cancel_note = {'note':'cancel'};
      //does the actual cancel but returns only a http response code 204 if successful
      cancelBilling(req, res);
  })
}
