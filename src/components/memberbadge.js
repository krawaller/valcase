var React = require("react"),
	ptypes = React.PropTypes,
	Link = require("react-router").Link,
	ReactRedux = require("react-redux");

var Memberbadge = React.createClass({
	propTypes: {
		// supplied from parent component
		uid: ptypes.string.isRequired,
		// redux store state, imported below
		userdata: ptypes.object.isRequired
	},
	render: function(){
		var p = this.props, name = (p.userdata[p.uid]||{username:"..loading.."}).username;
		return <Link to={"/members/"+this.props.uid}>{name}</Link>;
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	return {
		userdata: state.users.userdata
	};
};

module.exports = ReactRedux.connect(mapStateToProps)(Memberbadge);
