/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase"),
	usersRef = new Firebase(C.FIREBASE).child("users");

module.exports = {
	startListeningToUsers: function(){
		return function(dispatch,getState){
			usersRef.on("value",function(snapshot){
				dispatch({ type: C.RECEIVE_USER_DATA, userdata: snapshot.val() });
			});
		}
	},
	updateUserDescription: function(userid,content){
		return function(dispatch,getState){
			dispatch({type:C.AWAIT_USER_RESPONSE});
			usersRef.child(userid).child("description").set(content,function(error){
				dispatch({type:C.RECEIVE_USER_RESPONSE});
				if (error){
					dispatch({type:C.DISPLAY_ERROR,error:"Update failed!"});
				}
			});
		}
	}
};
