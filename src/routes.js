/*
This is the "sitemap" of our app! 
*/

var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Wrapper = require('./components/wrapper'),
    Home = require('./components/home'),
    User = require('./components/user'),
    Roster = require('./components/roster');

module.exports = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={Home} />
        <Route path="/members/">
            <IndexRoute component={Roster} />
            <Route path="/members/:memberid" component={User} />
        </Route>
    </Route>
);
