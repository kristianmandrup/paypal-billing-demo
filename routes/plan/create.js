module.exports = function (app, action) {
  //Creates the plans based on what is defined in model.js.
  app.get('/payment/create-plan', function (req, res) {
      var names = Object.keys(model.plans);
      for(let name of names){
        action(model.plans[name]);
      }
      res.json({'status':'success'});
  })
}
