module.exports = function (app, action) {
  //execute payment for plan. this endpoint is called when the user has paided via PayPal
  app.get('/payment/execute/', function (req, res) {
    // TODO: using information in the session, and agreement ID, store the information in Firebase
    //checks if there is a token
    if(req.query.token){
      action(req, res);
    } else {
      res.json({'status':'failed'})
    }
  })
}
