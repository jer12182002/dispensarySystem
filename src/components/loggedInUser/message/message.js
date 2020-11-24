import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import MessageInputSection from './messageInputSection/messageInputSection';
import './message.scss';

class message extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div className="message-wrapper">message
            	<MessageInputSection userInformation = {this.props.userInformation}/>
            </div>
        );
    }
}


const mapStateToProps = state => {
	
	return {
		
	};
}


const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(message);
