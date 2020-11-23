import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import MessageInputSection from './messageInputSection/messageInputSection';
import './message.scss';

class message extends Component {

    render() {
        return (
            <div className="message-wrapper">message
            	<MessageInputSection/>
            </div>
        );
    }
}


const mapStateToProps = state => {
	return {};
}


const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(message);
