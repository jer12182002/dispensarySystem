import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import './allOrders.scss';
import {LOAD_ALL_ORDERS} from 'redux/actions/allOrdersAction';

class allOrders extends Component {
	componentDidMount () {
		this.props.LOAD_ALL_ORDERS(this.props.account);
	}


	displayOrders (orderTitle, orders){
		if(orders) {
			return (
				<div className="orders-container container-fluid">
					<div className="row">
						<h1>{orderTitle}</h1>
					</div>
					<div className="orderHeader row">
						<div className="col-2"><p>Order No.</p></div>
						<div className="col-4"><p>Order Time</p></div>
						<div className="col-4"><p>Customer</p></div>
						<div className="col-2"><p>Action</p></div>
						
					</div>
					{orders.map((order,key)=>
						<div className="row">
							<div className="col-2"><p>{order.ORDER_ID}</p></div>
							<div className="col-4"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
							<div className="col-4"><p>{order.CUSTOMER}</p></div>
							<div className="col-2"><button className="btn btn-success">View</button></div>
						</div>
					)}
				</div>
			)
		}else {
			return <p>Cannot fetching data...please check server connection</p>
		}
	}

	displayOrdersForRenDeInc (orderTitle, orders){
		if(orders) {
			return (
				<div className="orders-container container-fluid">
					<div className="row">
						<h1>{orderTitle}</h1>
					</div>
					<div className="orderHeader row">
						<div className="col-1"><p>Account</p></div>
						<div className="col-2"><p>Order No.</p></div>
						<div className="col-3"><p>Order Time</p></div>
						<div className="col-4"><p>Customer</p></div>
						<div className="col-2"><p>Action</p></div>
						
					</div>
					{orders.map((order,key)=>
						<div className="row">
							<div className="col-1"><p>{order.ACCOUNT}</p></div>
							<div className="col-2"><p>{order.ORDER_ID}</p></div>
							<div className="col-3"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
							<div className="col-4"><p>{order.CUSTOMER}</p></div>
							<div className="col-2"><button className="btn btn-success">View</button></div>
						</div>
					)}
				</div>
			)
		}else {
			return <p>Cannot fetching data...please check server connection</p>
		}
	}



    render() {
        return (
            <div className="orderList-container container-fluid">
            	{this.props.account === "RenDeInc"?
            		<>
            		<div className="diplayAllOrders_rendeinc row">
            			<button className="btn btn-info" onClick={e=>{e.preventDefault(); this.props.LOAD_ALL_ORDERS(this.props.account, !this.props.allAccountPermission)}}>
            				{this.props.allAccountPermission ?
            					"Hide Orders From Other Accounts"
            					:
            					"Display Orders From All Accounts" 
            				}
            			</button>
            		</div>
            		{this.props.allAccountPermission?
	            		<>
	            		{this.displayOrdersForRenDeInc("Draft Orders", this.props.draftOrders)}
	        			{this.displayOrdersForRenDeInc("Receipt Orders", this.props.receiptOrders)}
	        			</>
	        			:
	        			<>
	        			{this.displayOrders("Draft Orders", this.props.draftOrders)}
        				{this.displayOrders("Receipt Orders", this.props.receiptOrders)}
        				</>
            		}
        			</>
            		:
            		<>
            			{this.displayOrders("Draft Orders", this.props.draftOrders)}
        				{this.displayOrders("Receipt Orders", this.props.receiptOrders)}
            		</>
            	}
        		
            </div>
        );
    }
}

const mapStateToPros = state => {
	console.log(state);
	return {
		allAccountPermission: state.allOrders.allAccountPermission,
		allOrders: state.allOrders.orders, 
		draftOrders: state.allOrders.draftOrders, 
		receiptOrders: state.allOrders.receiptOrders
	}
}

const mapDispatchToProps = dispatch => {
	return {
		LOAD_ALL_ORDERS:(account, permissionToggle=false)=>dispatch(LOAD_ALL_ORDERS(account,permissionToggle))
	}
}

export default connect(mapStateToPros, mapDispatchToProps)(allOrders);
