var createPlan = require('../../plans/create');

module.exports = function (app) {
  //Creates the plans based on what is defined in model.js.
  app.get('/payment/create-plan', function (req, res) {
      var names = Object.keys(model.plans);
      for(let name of names){
        createPlan(model.plans[name]);
      }
      res.json({'status':'success'});
  })
}
