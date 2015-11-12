var React = require('react'),
	Router = require("react-router"),
	Link = Router.Link,
	IndexLink = Router.IndexLink;

var Navbar = React.createClass({
	render: function() {
		return (<ul className="nav">
			<li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
			<li><Link activeClassName="active" to="/members/">Roster</Link></li>
		</ul>);
	}
});

module.exports = Navbar;