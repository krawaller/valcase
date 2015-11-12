/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase"),
	chatRef = new Firebase(C.FIREBASE).child("chat"),
	userRef = new Firebase(C.FIREBASE).child("users"),
	_ = require("lodash");

module.exports = {
	startListeningToChat: function(){
		return function(dispatch,getState){
			chatRef.on("value",function(snapshot){
				dispatch({ type: C.RECEIVE_CHAT_UPDATE, chatdata: snapshot.val() });
			});
		}
	},
	sendChat: function(uid,message){
		return function(dispatch,getState){
			var timestamp = Date.now();
			dispatch({
				type: C.AWAIT_CHAT_RESPONSE,
				when: timestamp,
				message: message,
				uid: uid
			});
			chatRef.transaction(function(chatdata){
				chatdata = chatdata || [];
				var toberemoved = Math.max(chatdata.length-C.MAX_CHATS+1,0);
				console.log("CHATDATA was",chatdata.length,"max is",C.MAX_CHATS,"gonna remove",toberemoved);
				return _.drop(chatdata,toberemoved).concat({
					when: timestamp,
					message: message,
					uid: uid
				});
			},function(error,committed,snapshot){
				dispatch({type:C.RECEIVE_CHAT_RESPONSE}); // allow chatting again

				// update remote user statistics
				userRef.child(uid).transaction(function(currentdata){
					return Object.assign(currentdata||{},{
						chats: (currentdata && currentdata.chats || 0)+1
					});
				});
			});
		}
	}
};
