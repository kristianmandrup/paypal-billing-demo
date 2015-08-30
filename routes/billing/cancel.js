module.exports = function (app, action) {
  //cancels a specific agreement
  app.get('/payment/cancel/:agreementId', function(req, res) {
      var cancel_note = {'note':'cancel'};
      //does the actual cancel but returns only a http response code 204 if successful
      action(req, res);
  })
}
