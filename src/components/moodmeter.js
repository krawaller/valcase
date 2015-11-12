var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions"),
	C = require("../constants"),
	_ = require("lodash"),
	B = require("react-bootstrap");

var Moodmeter = React.createClass({
	propTypes: {
		// redux store state, imported below
		companymood: ptypes.any
	},
	render: function(){
		var p = this.props,
			mood = p.companymood,
			currentvote = mood.votes && mood.votes[p.uid],
			rows = [">:(",":(",":|",":)",":D"].map(function(opt,n){
				var disabled = p.voting || !p.uid;
				return <B.Button onClick={p.vote.bind(this,n)} key={n} active={n===currentvote} disabled={disabled}>
					{opt}<span className="moodcount">{mood.optionvotes[n]}</span>
				</B.Button>;
			});
		return (<div className="moodmeter">
			<B.ButtonGroup>
				{rows}
			</B.ButtonGroup>
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	// This component will have access to blah
	return {
		companymood:state.polls.polldata.companymood,
		uid: state.auth.uid,
		voting: state.polls.voting
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		vote: function(option){ dispatch(actions.voteInPoll("companymood",option)); },
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Moodmeter);
