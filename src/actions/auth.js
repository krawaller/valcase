/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase"),
	fireRef = new Firebase(C.FIREBASE);

module.exports = {
	startListeningToAuth: function(){
		return function(dispatch,getState){
			fireRef.onAuth(function(authData){
				if (authData){ 
					// log in user inside the app
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.facebook.displayName
					});
					// update remote user statistics
					fireRef.child("users").child(authData.uid).transaction(function(currentdata){
						return Object.assign(currentdata||{},{
							username: authData.facebook.displayName,
							logins: (currentdata && currentdata.logins || 0)+1
						});
					});
				} else {
					if (getState().auth.currently !== C.ANONYMOUS){ // might have set local logout synchronously
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	},
	attemptLogin: function(){
		return function(dispatch,getState){
			dispatch({type:C.ATTEMPTING_LOGIN});
			fireRef.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
					dispatch({type:C.DISPLAY_ERROR,error:"Login failed!"});
					dispatch({type:C.LOGOUT});
				} else {
					// no need to do anything here, listener above will deal with it
				}
			});
		}
	},
	logoutUser: function(){
		return function(dispatch,getState){
			dispatch({type:C.LOGOUT}); // don't really need to do this, but nice to get immediate feedback
			fireRef.unauth();
		}
	}
};
