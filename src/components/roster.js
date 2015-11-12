var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	Memberbadge = require("./memberbadge"),
	_ = require("lodash");

var Roster = React.createClass({
	propTypes: {
		// redux store state, imported below
		userdata: ptypes.object.isRequired
	},
	render: function(){
		var members = _.map(this.props.userdata,function(user,uid){
			return <Memberbadge key={uid} uid={uid} />;
		});
		return (<div>
			<h4>All users</h4>
			{members}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	return {
		userdata: state.users.userdata
	};
};

module.exports = ReactRedux.connect(mapStateToProps)(Roster);
