var Redux = require("redux"),
	authReducer = require("./auth"),
	moodReducer = require("./mood");

var rootReducer = Redux.combineReducers({
	auth: authReducer, // this means authReducer will operate on appState.auth
	moods: moodReducer
});

module.exports = rootReducer;