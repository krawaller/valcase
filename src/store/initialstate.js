/*
This is the initial state of the Redux Store. I store it in a separate file because I also use
it in the reducers when we do the Reset action.

It returns a function instead of an object to make sure no one can change the initial state.
*/

var C = require("../constants"),
	_ = require("lodash");

module.exports = function(){
	return {
		// auth data
		auth: {
			currently: C.ANONYMOUS,
			username: null,
			uid: null
		},
		// moods
		moods: {
			usermood: null,
			companymood: null
		}
	};
};