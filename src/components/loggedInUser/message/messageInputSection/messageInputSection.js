import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import './messageInputSection.scss';
import * as MESSAGE from 'redux/actions/messageAction';

class messageInputSection extends Component {
	componentDidMount() {
		this.props.SET_RECIPIENTS(this.props.userInformation);
	}

    render() {
        return (
            <div className="messageInputSection-wrapper container-fluid">
            	<div className="row">
            		<div className="authorContainer col-lg-3">
            			<div className="row">
	            			<h1>Author:</h1>
	            			<input type="text" value = {this.props.author} onChange = {e => {e.preventDefault(); this.props.AUTHOR_INPUT(e.target.value);}}/>
            			</div>
            			<div className="row">
	            			<h1>Recipient</h1>
	            			<select onChange = {e => {this.props.RECIPIENT_INPUT(e.target.value);}}>
	            				{this.props.recipients && this.props.recipients.length?
	            					this.props.recipients.map((recipient,index) => 
	            						<option key = {index} value = {recipient.id}>{recipient.account}</option>
	            					)
	            					:null
	            				}
	            			</select>
            			</div>
            		</div>
            		<div className="col-lg-8">
            			<textarea value={this.props.message} onChange = {e => {e.preventDefault();this.props.MESSAGE_INPUT(e.target.value);}}/>
            		</div>
            		<div className="col-lg-1 col-sm-12">
            			<button className="btn btn-success" disabled={!this.props.author || !this.props.message} onClick = {e => {e.preventDefault(); this.props.SEND_MESSAGE_BTN_CLICKED(this.props.userInformation.id);}}>Send</button>
            		</div>
            	</div>
            </div>
        );
    }
}


const mapStateToProps = state => {
	if(state.message.messageInput) {
		return {
			recipients: state.message.messageInput.recipients,
			author: state.message.messageInput.author,
			recipientId: state.message.messageInput.recipientId,
			message: state.message.messageInput.message
		}
	}
	return {}
}


const mapDispatchToProps = dispatch => {
	return {
		SET_RECIPIENTS: (account) => dispatch(MESSAGE.SET_RECIPIENTS(account)),
		AUTHOR_INPUT: (value) => dispatch(MESSAGE.AUTHOR_INPUT(value)),
		RECIPIENT_INPUT: (value) => dispatch(MESSAGE.RECIPIENT_INPUT(value)),
		MESSAGE_INPUT: (value) => dispatch(MESSAGE.MESSAGE_INPUT(value)),
		SEND_MESSAGE_BTN_CLICKED: (authorId) => dispatch(MESSAGE.SEND_MESSAGE_BTN_CLICKED(authorId))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(messageInputSection);