var React = require("react"),
	ptypes = React.PropTypes,
	markdown = require("markdown").markdown,
	ReactRedux = require("react-redux"),
	C = require("../constants");

var Textblock = React.createClass({
	propTypes: {
		editcb: ptypes.func.isRequired,
		canedit: ptypes.bool.isRequired,
		content: ptypes.string.isRequired,
		// redux action
		displayError: ptypes.func.isRequired
	},
	getInitialState: function(){
		return {editing:false};
	},
	stopEdit: function(){
		this.setState({editing:false});
	},
	startEdit: function(){
		this.setState({editing:true});
	},
	onSubmit: function(e){
		var node = this.refs['field'],
			val = (node.value || ''),
			err = "",
			p = this.props;
		e.preventDefault();
		if (val.length < C.MIN_TEXT_LENGTH) {
			p.displayError("Text must be at least "+C.MIN_TEXT_LENGTH+" characters!");
		} else {
			p.editcb(val);
			node.value = '';
			this.stopEdit();
		}
		return false;
	},
	render: function(){
		var p = this.props;
		if (this.state.editing){
			return (<div className="textblock editing">
				<form onSubmit={this.onSubmit}>
					<div className='input-group'>
						<textarea className='form-control' type='text' ref='field' defaultValue={p.content} />
						<span className='input-group-btn'>
							<button className='btn btn-default' type='submit'>Submit</button>
							<button onClick={this.stopEdit} className='btn btn-default' type='button'>Cancel</button>
						</span>
					</div>
				</form>
			</div>);
		} else {
			return (<div className={"textblock"+(p.canedit?" canedit":"")}>
				<div dangerouslySetInnerHTML={{__html:markdown.toHTML(p.content||"*no info*")}}/>
				{p.canedit ? <button onClick={this.startEdit}>Edit</button> : ""}
			</div>);	
		}
	}
});


// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	// This component will have access to nothing
	return {};
};

var mapDispatchToProps = function(dispatch){
	return {
		displayError: function(err){ dispatch(actions.displayError(err)); },
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Textblock);
