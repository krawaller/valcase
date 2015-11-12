var React = require("react"),
	markdown = require("markdown").markdown;

var Markdown = React.createClass({
	render: function(){
		return <div dangerouslySetInnerHTML={{__html:markdown.toHTML(this.props.content||"*no info*")}}/>
	}
});

module.exports = Markdown;
