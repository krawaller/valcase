var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions"),
	C = require("../constants"),
	Markdown = require("./markdown");

var User = React.createClass({
	propTypes: {
		// redux store state, imported below
		userdata: ptypes.object.isRequired,
		// redux action hookups, set up below
		attemptLogin: ptypes.func.isRequired,
		logoutUser: ptypes.func.isRequired
	},
	render: function(){
		var p = this.props,
			memberid = p.params.memberid;

		if (!p.userdata || !p.userdata[memberid]){
			return <p>Okänd medlem!</p>;
		}

		var user = p.userdata[memberid];

		return (<div>
			<h4>{user.username}</h4>
			<Markdown content={user.description} canedit={memberid===p.uid} />
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	// This component will have access to `appState.auth` through `this.props.auth`
	return {
		userdata:state.users.userdata,
		uid:state.auth.uid
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		attemptLogin: function(){ dispatch(actions.attemptLogin()); },
		logoutUser: function(){ dispatch(actions.logoutUser()); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(User);
