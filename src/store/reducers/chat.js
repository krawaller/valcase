var C = require("../../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.chat data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state,action){
	switch(action.type){
		case C.RECEIVE_CHAT_UPDATE:
			return {
				chatting: state.chatting,
				chatdata: action.chatdata
			};
		case C.AWAIT_CHAT_RESPONSE:
			return {
				chatting: true,
				chatdata: state.chatdata.concat({
					message: action.message,
					when: action.when,
					uid: action.uid,
					local: true
				})
			};
		case C.RECEIVE_CHAT_RESPONSE:
			return {
				chatting: false,
				chatdata: state.chatdata
			};
		default: return state || initialState().chat;
	}
};