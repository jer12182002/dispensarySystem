import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './message.scss';
import ScrollWidget from 'components/scrollWidget/scrollWidget';
import moment from 'moment';

import * as MESSAGE_ACTION from 'redux/actions/messageAction';
import MessageInputSection from './messageInputSection/messageInputSection';

class message extends Component {
    INTERVAL_NAME = "loadMessages";

    componentDidMount() {
        this.INTERVAL_NAME = setInterval(()=>{
            this.props.LOAD_ALL_MESSAGES(this.props.userInformation, this.props.messages.length)
        },1000);
        
    
    }

    componentWillUnmount() {
        MESSAGE_ACTION.CHANGE_ALLOW_SCROLL();
        clearInterval(this.INTERVAL_NAME);
    }

    render() {
        return (
            <div className="message-wrapper">
                <ScrollWidget scrollTarget = ".messages-container"/>
                <div className = "messages-container container-fluid">

                    {this.props.messages && this.props.messages.length?
                       this.props.messages.map((msg, index) => 
                        msg.AUTHOR_ID === this.props.userInformation.id?

                            <div className="row receiver">
                              <div className="msgTitle col-lg-4 col-md-3">
                                    <p>Author: {msg.AUTHOR}</p>
                                </div>
                                <div className="msgTitle col-lg-4 col-md-3">
                                    <p>To: {MESSAGE_ACTION.PARSE_ID_TO_ACCOUNT(msg.RECIPIENT_ID)}</p>
                                </div>
                                <div className="msgTitle col-lg-4 col-md-6">
                                    <p>Time: {moment(msg.TIME).format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>
                                <div className="msgBody col-lg-12 col-md-12">
                                    <pre>{msg.MESSAGE}</pre>
                                </div>
                            </div>

                            :

                            <div className="row sender">
                               <div className="msgTitle col-lg-4 col-md-3">
                                    <p>Author: {msg.AUTHOR}</p>
                                </div>
                                <div className="msgTitle col-lg-4 col-md-3">
                                    <p>From: {MESSAGE_ACTION.PARSE_ID_TO_ACCOUNT(msg.AUTHOR_ID)}</p>
                                </div>
                                <div className="msgTitle col-lg-4 col-md-6">
                                    <p>Time: {moment(msg.TIME).format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>
                                <div className="msgBody col-lg-12 col-md-12">
                                    <pre>{msg.MESSAGE}</pre>
                                </div>
                            </div>
                       )
                       :
                       null
                    }
                </div>
            	<MessageInputSection userInformation = {this.props.userInformation}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
	
    if(state.message.messages) {
        return {
            messages: state.message.messages,
            allowScroll: state.message.allowScroll
        }
    }

	return {};
}


const mapDispatchToProps = dispatch => {
	return {
        LOAD_ALL_MESSAGES: (account, prevMsgSize) => dispatch(MESSAGE_ACTION.LOAD_ALL_MESSAGES(account, prevMsgSize))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(message);
