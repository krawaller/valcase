/*
This module contains action creators dealing with `appState.auth`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	Firebase = require("firebase");
	pollRef = new Firebase(C.FIREBASE).child("polls");

module.exports = {
	startListeningToPolls: function(){
		return function(dispatch,getState){
			pollRef.on("value",function(snapshot){
				dispatch({ type: C.RECEIVE_POLL_UPDATE, polldata: snapshot.val() });
			});
		}
	},
	voteInPoll: function(pollid,option){
		console.log("Voting in poll",pollid,option);
		return function(dispatch,getState){
			var uid = getState().auth.uid;
			dispatch({type:C.AWAIT_POLL_RESPONSE}); // will prevent further voting while we await result
			pollRef.child(pollid).transaction(function(polldata){
				polldata.votes = polldata.votes || {};
				var currentvote = polldata.votes[uid];
				if (currentvote === option){
					return; 
				}
				if (currentvote === undefined){
					polldata.totalvotes = polldata.totalvotes+1;
				} else {
					polldata.optionvotes[currentvote] = polldata.optionvotes[currentvote]-1;
				}
				polldata.optionvotes[option] = polldata.optionvotes[option] + 1;
				polldata.votes[uid] = option;
				return polldata;
			},function(error,committed,snapshot){
				dispatch({type:C.RECEIVE_POLL_RESPONSE}); // allow voting again
			});
		}
	}
};
