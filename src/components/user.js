var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions"),
	C = require("../constants"),
	Textblock = require("./textblock");

var User = React.createClass({
	propTypes: {
		// redux store state, imported below
		userdata: ptypes.object.isRequired,
		uid: ptypes.string,
		waiting: ptypes.bool.isRequired,
		// redux action hookups, set up below
		attemptLogin: ptypes.func.isRequired,
		logoutUser: ptypes.func.isRequired,
		updateUserDescription: ptypes.func.isRequired
	},
	render: function(){
		var p = this.props,
			memberid = p.params.memberid,
			editcb = p.updateUserDescription.bind(this,p.uid);

		if (!p.userdata || !p.userdata[memberid]){
			return <p>Okänd medlem!</p>;
		}

		var user = p.userdata[memberid];

		return (<div>
			<h4>{user.username}</h4>
			<p>Chats: {user.chats}</p>
			<p>Logins: {user.logins}</p>
			<Textblock content={user.description||""} canedit={!p.waiting && memberid===p.uid} editcb={editcb} />
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	return {
		userdata: state.users.userdata,
		uid:state.auth.uid,
		waiting: state.users.editing
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		attemptLogin: function(){ dispatch(actions.attemptLogin()); },
		logoutUser: function(){ dispatch(actions.logoutUser()); },
		updateUserDescription: function(uid,desc){ dispatch(actions.updateUserDescription(uid,desc)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(User);
