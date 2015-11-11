/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase");
	ref = new Firebase(C.FIREBASE);

module.exports = {
	startListeningToCompanyMood: function(){
		return function(dispatch,getState){
			ref.child("companymood").on("value",function(snapshot){
				dispatch({ type: C.RECEIVE_COMPANY_MOOD_UPDATE, companymood: snapshot.val() });
			});
		}
	}
};
