/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase");
	ref = new Firebase(C.FIREBASE);

module.exports = {
	startListeningToAuth: function(){
		return function(dispatch,getState){
			ref.onAuth(function(authData){
				if (authData){
					dispatch({
						type: C.LOGIN_USER,
						uid: authData.uid,
						username: authData.facebook.displayName
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
			ref.authWithOAuthPopup("facebook", function(error, authData) {
				if (error) {
					alert("Login error!"); // TODO - nicify error msg
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
			ref.unauth();
		}
	}
};
