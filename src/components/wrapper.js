/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react'),
	Authpanel = require('./authpanel'),
    Moodmeter = require('./moodmeter'),
    Chatpanel = require('./chatpanel'),
    Navbar = require('./navbar'),
    Twitterfeed = require("./twitterfeed");

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <header>
                    <h2>Poolia intranet prototype</h2>
                    <Authpanel/>
                    <Moodmeter/>
                </header>
                <Navbar />
                <div className="center">
                	{this.props.children}
                </div>
                <aside className="rightpanel">
                    <Chatpanel/>
                    <Twitterfeed />
                </aside>
            </div>
        );
    }
});

module.exports = Wrapper;