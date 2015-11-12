var C = require("../../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.users data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state,action){
	switch(action.type){
		case C.RECEIVE_USER_DATA:
			return {
				editing: state.editing,
				userdata: action.userdata
			};
		case C.AWAIT_USER_RESPONSE:
			return {
				editing: true,
				userdata: state.userdata
			};
		case C.RECEIVE_USER_RESPONSE:
			return {
				editing: false,
				userdata: state.userdata
			};
		default: return state || initialState().users;
	}
};