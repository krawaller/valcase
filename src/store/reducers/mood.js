var C = require("../../constants"),
	initialState = require("../initialstate");

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.auth data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function(state,action){
	switch(action.type){
		case C.RECEIVE_COMPANY_MOOD_UPDATE:
			return Object.assign({},state,{
				companymood: action.companymood
			});
		default: return state || initialState().moods;
	}
};