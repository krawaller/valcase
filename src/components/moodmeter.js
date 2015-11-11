var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions"),
	C = require("../constants"),
	_ = require("lodash");

var Moodmeter = React.createClass({
	propTypes: {
		// redux store state, imported below
		companymood: ptypes.any
	},
	render: function(){
		var cm = this.props.companymood, rows = [">:(",":(",":|",":)",":D"].map(function(mood,n){
			return <span key={n}>{mood} {cm ? cm["mood"+(n+1)] : "?"}</span>;
		});
		return (<div>
			{rows}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	// This component will have access to `appState.auth` through `this.props.auth`
	return {companymood:state.moods.companymood};
};

module.exports = ReactRedux.connect(mapStateToProps)(Moodmeter);
