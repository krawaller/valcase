var C = require("../../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.polls data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state,action){
	switch(action.type){
		case C.RECEIVE_POLL_UPDATE:
			return {
				voting: state.voting,
				polldata: action.polldata
			};
		case C.AWAIT_POLL_RESPONSE:
			return {
				voting: true,
				polldata: state.polldata
			};
		case C.RECEIVE_POLL_RESPONSE:
			return {
				voting: false,
				polldata: state.polldata
			};
		default: return state || initialState().polls;
	}
};