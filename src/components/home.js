var React = require("react"),
	ptypes = React.PropTypes,
	ReactRedux = require("react-redux"),
	actions = require("../actions");

var Home = React.createClass({
	render: function(){
		return (
			<div>
				<h4>Välkommen till Poolias intranät!</h4>
				<p>Wee!</p>
			</div>
		);
	}
});

module.exports = Home;