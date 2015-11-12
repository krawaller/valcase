var authActions = require("./auth"),
	pollActions = require("./polls"),
	userActions = require("./users"),
	chatActions = require("./chat"),
	feedbackActions = require("./feedback");

module.exports = Object.assign({},authActions,pollActions,userActions,chatActions,feedbackActions);