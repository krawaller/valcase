var React = require("react"),
ptypes = React.PropTypes,
ReactRedux = require("react-redux"),
actions = require("../actions"),
C = require("../constants"),
Memberbadge = require("./memberbadge");

var Chatpanel = React.createClass({
	propTypes: {
		// redux store state, imported below
		chatting: ptypes.bool.isRequired,
		chatdata: ptypes.arrayOf(ptypes.shape({
			uid: ptypes.string.isRequired,
			when: ptypes.number.isRequired,
			message: ptypes.string.isRequired,
			local: ptypes.bool
		})).isRequired,
		// redux action hookups, set up below
		sendChat: ptypes.func.isRequired,
		displayError: ptypes.func.isRequired
	},
	onSubmit: function(e){
		var node = this.refs['field'],
			val = (node.value || ''),
			err = "",
			p = this.props;
		e.preventDefault();
		if (val.length < C.MIN_CHAT_LENGTH) {
			p.displayError("Chat message must be at least "+C.MIN_CHAT_LENGTH+" characters!");
		} else {
			p.sendChat(p.uid,val);
			node.value = '';
		}
		return false;
	},
	render: function(){
		var p = this.props, rows = p.chatdata.map(function(msg,n){
			return (<div key={n} className={"chatmsg "+(msg.local?"local":"")}>
				<Memberbadge uid={msg.uid} />: {msg.message}
			</div>);
		});
		return (<div className="chatpanel">
			<div className="chatmessages">{rows}</div>
			{p.uid ? <form onSubmit={this.onSubmit}>
				<div className='input-group'>
					<input className='form-control' type='text' ref='field'/>
					<span className='input-group-btn'>
						<button className='btn btn-default' type='submit'>Send!</button>
					</span>
				</div>
			</form> : ""}
		</div>);
	}
});

// now we connect the component to the Redux store:

var mapStateToProps = function(state){
	return {
		chatdata: state.chat.chatdata,
		chatting: state.chat.chatting,
		uid: state.auth.uid
	};
};

var mapDispatchToProps = function(dispatch){
	return {
		sendChat: function(uid,msg){ dispatch(actions.sendChat(uid,msg)); },
		displayError: function(error){ dispatch(actions.displayError(error)); }
	}
};

module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(Chatpanel);
