var C = require("../../constants"),
	initialState = require("../initialstate");

module.exports = function(state,action){
	switch(action.type){
		case C.DISPLAY_ERROR:
			alert(action.error);
			return state;
		default: return state || initialState().feedback;
	}
};