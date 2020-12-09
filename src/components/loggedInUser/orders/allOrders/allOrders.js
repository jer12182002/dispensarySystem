import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import './allOrders.scss';
import * as allOrdersAction from 'redux/actions/allOrdersAction';

class allOrders extends Component {
	componentDidMount () {
		this.props.LOAD_ALL_ORDERS(this.props.account);
	}


	displayOrders (orderTitle, orders, link){
		if(orders) {
			return (
				<div className="orders-container container-fluid">
					<div className="row">
						<h1>{orderTitle}</h1>
					</div>
					<div className="orderHeader row">
						<div className="col-2"><p>Order No.</p></div>
						<div className="col-2"><p>Formula</p></div>
						<div className="col-3"><p>Order Time</p></div>
						<div className="col-3"><p>Customer</p></div>
						<div className="col-2"><p>Action</p></div>
						
					</div>
					<div className="container-fluid orderBody">
					{this.props.orderFilter?
						allOrdersAction.FILTER_ORDERS(orders, this.props.orderFilter).map((order, key) =>
						<div className="row">
							<div className="col-2"><p>{order.ORDER_ID}</p></div>
							<div className="col-2"><p>{order.FORMULA}</p></div>
							<div className="col-3"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
							<div className="col-3"><p>{order.CUSTOMER}</p></div>
							<div className="col-2"><Link to={{pathname:`${link}`, state:{order_id: order.ORDER_ID}}} className="btn btn-success">View</Link></div>
						</div>
						)
						:
						orders.map((order,key)=>
							<div className="row">
								<div className="col-2"><p>{order.ORDER_ID}</p></div>
								<div className="col-2"><p>{order.FORMULA}</p></div>
								<div className="col-3"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
								<div className="col-3"><p>{order.CUSTOMER}</p></div>
								<div className="col-2"><Link to={{pathname:`${link}`, state:{order_id: order.ORDER_ID}}} className="btn btn-success">View</Link></div>
							</div>
						)
					}
					</div>
				</div>
			)
		}else {
			return <p>Cannot fetching data...please check server connection</p>
		}
	}

	displayOrdersForRenDeInc (orderTitle, orders, link){
		if(orders) {
			return (
				<div className="orders-container orders-container-rendeinc-display container-fluid">
					<div className="row">
						<h1>{orderTitle}</h1>
					</div>
					<div className="orderHeader row">
						<div className="col-2"><p>Account</p></div>
						<div className="col-2"><p>Order No.</p></div>
						<div className="col-2"><p>Order Time</p></div>
						<div className="col-4"><p>Customer</p></div>
						<div className="col-1"><p>Action</p></div>
						
					</div>
					<div className="container-fluid orderBody">
					{this.props.orderFilter?
						allOrdersAction.FILTER_ORDERS(orders, this.props.orderFilter).map((order, key) =>
							<div className="row">
							<div className="col-2"><p>{order.ACCOUNT}</p></div>
							<div className="col-2"><p>{order.ORDER_ID}</p></div>
							<div className="col-2"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
							<div className="col-4"><p>{order.CUSTOMER}</p></div>
							<div className="col-1"><Link to={{pathname:`${link}`, state:{order_id: order.ORDER_ID}}} className="btn btn-success">View</Link></div>
						</div>
						)
						:
						orders.map((order,key)=>
							<div className="row">
								<div className="col-2"><p>{order.ACCOUNT}</p></div>
								<div className="col-2"><p>{order.ORDER_ID}</p></div>
								<div className="col-2"><p>{moment(order.DATE).format('YYYY-MM-DD')}</p></div>
								<div className="col-4"><p>{order.CUSTOMER}</p></div>
								<div className="col-1"><Link to={{pathname:`${link}`, state:{order_id: order.ORDER_ID}}} className="btn btn-success">View</Link></div>
							</div>
						)
					}
					</div>
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
	            		<div className="search-container row">
	 						<h1>Filter</h1>
	 						<input type="text" value={this.props.orderFilter} onChange = {e=> this.props.UPADTE_ORDER_FILTER(e.target.value)}/>
 						</div>
	            		{this.displayOrdersForRenDeInc("Draft Orders", this.props.draftOrders,"/orderediting")}
	        			{this.displayOrdersForRenDeInc("Receipt Orders", this.props.receiptOrders,"/orders/orderreview")}
	        			</>
	        			:
	        			<>
	        			<div className="search-container row">
	 						<h1>Filter</h1>
	 						<input type="text" value={this.props.orderFilter} onChange = {e=> this.props.UPADTE_ORDER_FILTER(e.target.value)}/>
	 					</div>
	        			{this.displayOrders("Draft Orders", this.props.draftOrders,"/orderediting")}
        				{this.displayOrders("Receipt Orders", this.props.receiptOrders,"/orders/orderreview")}
        				</>
            		}
        			</>
            		:
            		<>	
            			<div className="search-container row">
	 						<h1>Filter</h1>
	 						<input type="text" value={this.props.orderFilter} onChange = {e=> this.props.UPADTE_ORDER_FILTER(e.target.value)}/>
	 					</div>
            			{this.displayOrders("Draft Orders", this.props.draftOrders,"/orderediting")}
        				{this.displayOrders("Receipt Orders", this.props.receiptOrders,"/orders/orderreview")}
            		</>
            	}
        		
            </div>
        );
    }
}

const mapStateToPros = state => {
	return {
		allAccountPermission: state.allOrders.allAccountPermission,
		allOrders: state.allOrders.orders, 
		draftOrders: state.allOrders.draftOrders, 
		receiptOrders: state.allOrders.receiptOrders,
		orderFilter: state.allOrders.orderFilter
	}
}

const mapDispatchToProps = dispatch => {
	return {
		LOAD_ALL_ORDERS:(account, permissionToggle=false)=>dispatch(allOrdersAction.LOAD_ALL_ORDERS(account,permissionToggle)),
		UPADTE_ORDER_FILTER: orderFilter => dispatch(allOrdersAction.UPADTE_ORDER_FILTER(orderFilter))
	}
}

export default connect(mapStateToPros, mapDispatchToProps)(allOrders);
