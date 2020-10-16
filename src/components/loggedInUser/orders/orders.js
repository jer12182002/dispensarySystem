import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import './orders.scss';

import AllOrders from './allOrders/allOrders';

class recordedorder extends Component {

    render() {

        return (
            <div className="orders-wrapper">
            	<div className="orderEditing-container">
                    <Link to={{pathname:"/orderediting", state:{order_id: null}}} className="btn btn-success">New Order</Link>
            	</div>
            	<AllOrders account = {this.props.userInformation.account}/>
            </div>
        );
    }
}

export default recordedorder;
