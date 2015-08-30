module.exports = function (app, action, opts) {
  var backend = opts.backend;
  //initiate payment for a plan id
  app.get('/payment/initiate/:planId', function (req, res) {
      // TODO: initiate a session with the users, with an id to identify the user
      var planId = req.params.planId;
      // TODO: Remove hard dependency to Firebase!!!
      backend.onPlan(action);
  });
}
