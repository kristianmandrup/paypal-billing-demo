//create a firebase connection
var firebaseRef = new firebase(process.env.FIREBASE_URL);
//authenticate with firebase server
firebaseRef.authWithCustomToken(process.env.FIREBASE_TOKEN, function(error, authData){
    if(error){
        throw "Firebase Auth Failed for server!";
    }
});

module.exports = firebaseRef;
