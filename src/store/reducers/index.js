var Redux = require("redux"),
	authReducer = require("./auth"),
	pollsReducer = require("./polls"),
	userReducer = require("./users"),
	chatReducer = require("./chat"),
	feedbackReducer = require("./feedback"),
	tweetReducer = require("./tweets");

var rootReducer = Redux.combineReducers({
	auth: authReducer, // this means authReducer will operate on appState.auth
	polls: pollsReducer,
	users: userReducer,
	chat: chatReducer,
	feedback: feedbackReducer,
	tweets: tweetReducer
});

module.exports = rootReducer;