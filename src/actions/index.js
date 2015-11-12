var authActions = require("./auth"),
	pollActions = require("./polls"),
	userActions = require("./users"),
	chatActions = require("./chat"),
	feedbackActions = require("./feedback"),
	tweetActions = require("./tweets");

module.exports = Object.assign({},authActions,pollActions,userActions,chatActions,feedbackActions,tweetActions);