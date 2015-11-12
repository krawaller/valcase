var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	C = require("../constants");

var Twitterfeed = React.createClass({
	propTypes: {
		// redux store state, imported below
		tweets: ptypes.arrayOf(ptypes.string).isRequired,
	},
	render: function(){
		var p = this.props, rows = p.tweets.map(function(tweet,n){
			tweet = tweet.replace(/>Posted( on)?/,">").replace(/minutes ago</,"mins ago<");
			return <div key={n} className="singletweet" dangerouslySetInnerHTML={{__html:tweet}} />;
		});
		return (<div className="twitterfeed">
			<p><i className="fa fa-twitter fa-lg"/> #Poolia</p>
			{rows}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	return {
		tweets: state.tweets
	};
};

module.exports = ReactRedux.connect(mapStateToProps)(Twitterfeed);
