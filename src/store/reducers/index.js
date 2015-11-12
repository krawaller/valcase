var Redux = require("redux"),
	authReducer = require("./auth"),
	pollsReducer = require("./polls"),
	userReducer = require("./users.js"),
	chatReducer = require("./chat.js"),
	feedbackReducer = require("./feedback.js");

var rootReducer = Redux.combineReducers({
	auth: authReducer, // this means authReducer will operate on appState.auth
	polls: pollsReducer,
	users: userReducer,
	chat: chatReducer,
	feedback: feedbackReducer
});

module.exports = rootReducer;