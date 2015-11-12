/*
This module contains action creators dealing with `appState.tweets`
They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.
*/

var C = require("../constants"),
	twitterFetcher = require("../../lib/twitterfetcher");

module.exports = {
	startListeningToTweets: function(){
		return function(dispatch,getState){
			var getTweets = function(){
				twitterFetcher.fetch({
					id: C.TWITTER_WIDGET_ID,
					domId: '',
					maxTweets: C.TWITTER_MESSAGES_TO_SHOW,
					enableLinks: true,
					showUser: true,
					showTime: true,
					dateFunction: '',
					showRetweet: false,
					showInteraction: false,
					customCallback: function(tweets){
						dispatch({type: C.RECEIVE_TWEETS,tweets:tweets});
					},
				});
			};
			getTweets();
			setInterval(getTweets,C.TWITTER_REFRESH);
		}
	}
};
