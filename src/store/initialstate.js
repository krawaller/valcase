/*
This is the initial state of the Redux Store. I store it in a separate file because I also use
it in the reducers when we do the Reset action.

It returns a function instead of an object to make sure no one can change the initial state.
*/

var C = require("../constants"),
	_ = require("lodash");

module.exports = function(){
	return {
		// tweets
		tweets: [],
		// feedback
		feedback: {},
		// auth data
		auth: {
			currently: C.ANONYMOUS,
			username: null,
			uid: null
		},
		// polls
		polls: {
			voting: false,
			polldata: {
				companymood: {
					options: ["mood1","mood2","mood3","mood4","mood5"],
					optionvotes: [0,0,0,0,0],
					votes: {},
					totalvotes: 0
				}
			}
		},
		// users
		users: {
			userdata: {
				
			},
			editing: false
		},
		// chat
		chat: {
			chatdata: [],
			chatting: false
		}
	};
};