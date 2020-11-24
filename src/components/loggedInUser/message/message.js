import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import './message.scss';
import moment from 'moment';

import * as MESSAGE from 'redux/actions/messageAction';
import MessageInputSection from './messageInputSection/messageInputSection';

class message extends Component {
    componentDidMount() {
        this.props.LOAD_ALL_MESSAGES(this.props.userInformation);
    }

    render() {
        return (
            <div className="message-wrapper">
                <div id="aaa"className = "messages-container container-fluid">

                    {this.props.messages && this.props.messages.length?
                       this.props.messages.map((msg, index) => 
                        msg.AUTHOR_ID === this.props.userInformation.id?

                            <div className="row receiver">
                              <div className="col-6">
                                    <p>Author: {msg.AUTHOR}</p>
                                </div>
                                <div className="col-6">
                                    <p>To: {MESSAGE.PARSE_ID_TO_ACCOUNT(msg.RECIPIENT_ID)}</p>
                                </div>
                                <div className="col-12">
                                    <p>Time: {moment(msg.TIME).format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>
                                <div className="col-12">
                                    <p>{msg.MESSAGE}</p>
                                </div>
                            </div>

                            :

                            <div className="row sender">
                               <div className="col-6">
                                    <p>Author: {msg.AUTHOR}</p>
                                </div>
                                <div className="col-6">
                                    <p>To: {MESSAGE.PARSE_ID_TO_ACCOUNT(msg.RECIPIENT_ID)}</p>
                                </div>
                                <div className="col-12">
                                    <p>Time: {moment(msg.TIME).format('YYYY-MM-DD HH:mm:ss')}</p>
                                </div>
                                <div className="col-12">
                                    <p>{msg.MESSAGE}</p>
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
            messages: state.message.messages
        }
    }

	return {};
}


const mapDispatchToProps = dispatch => {
	return {
        LOAD_ALL_MESSAGES: (account) => dispatch(MESSAGE.LOAD_ALL_MESSAGES(account))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(message);
