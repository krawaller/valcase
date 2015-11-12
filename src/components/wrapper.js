/*
This is our top-level component. Sub-components matching specific routes will be
contained in `this.props.children` and rendered out.
*/

var React = require('react'),
	Authpanel = require('./authpanel'),
    Moodmeter = require('./moodmeter'),
    Chatpanel = require('./chatpanel');

var Wrapper = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <h2>Poolia intranet prototype</h2>
                <Authpanel/>
                <Moodmeter/>
                <div>
                	{this.props.children}
                </div>
                <Chatpanel/>
            </div>
        );
    }
});

module.exports = Wrapper;