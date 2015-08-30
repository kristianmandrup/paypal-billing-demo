var firebase = require('firebase');

//create a firebase connection
var firebaseRef = new firebase(process.env.FIREBASE_URL);
//authenticate with firebase server
firebaseRef.authWithCustomToken(process.env.FIREBASE_TOKEN, function(error, authData){
    if(error){
        throw "Firebase Auth Failed for server!";
    }
});

module.exports = {
  onPlan: function(action) {
    this.ref.child('/plans').on('value', action);
  },
  ref: firebaseRef
}
