import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import './messageInputSection.scss';
import * as MESSAGE from 'redux/actions/messageAction';

class messageInputSection extends Component {

    render() {
        return (
            <div className="messageInputSection-wrapper container-fluid">
            	<div className="row">
            		<div className="col-3">
            			<div className="row">
	            			<h1>Author:</h1>
	            			<input type="text" onChange = {e => {e.preventDefault(); this.props.AUTHOR_INPUT(e.target.value);}}/>
            			</div>
            			<div className="row">
	            			<h1>Recipient</h1>
	            			<select></select>
            			</div>
            		</div>
            		<div className="col-8">
            			<textarea/>
            		</div>
            		<div className="col-1">
            			<button className="btn btn-success">Send</button>
            		</div>
            	</div>
            </div>
        );
    }
}


const mapStateToProps = state => {

}


const mapDispatchToProps = dispatch => {
	return {
		AUTHOR_INPUT: (value) => dispatch(MESSAGE.AUTHOR_INPUT(value))
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(messageInputSection);