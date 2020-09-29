import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import './orders.scss';

class recordedorder extends Component {

    render() {
        return (
            <div className="orders-wrapper">
            	<div className="newOrder-container">
            		<Link to="/neworder" className="btn btn-success">New Order</Link>
            	</div>
            	<div className="orderList-container">
            	</div>
            </div>
        );
    }
}

export default recordedorder;
