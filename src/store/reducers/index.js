var Redux = require("redux"),
	authReducer = require("./auth"),
	pollsReducer = require("./polls");

var rootReducer = Redux.combineReducers({
	auth: authReducer, // this means authReducer will operate on appState.auth
	polls: pollsReducer
});

module.exports = rootReducer;