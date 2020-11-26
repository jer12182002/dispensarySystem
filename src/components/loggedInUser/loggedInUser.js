import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './loggedInUser.scss';

import Header from '../header/header';
import Inventory from './inventory/inventory';
import OrderEditing from './orders/orderEditing/orderEditing';
import Orders from './orders/orders';
import OrderReview from './orders/orderReview/orderReview';
import Message from './message/message';
import * as MESSAGE_ACTION from 'redux/actions/messageAction';

class loggedInUser extends React.Component {
	INTERVAL_NAME = "loadUnreadMsgNumber";

	componentDidMount () {
			this.props.LOAD_UNREAD_MSG_NUMBER(this.props.loginAccount);
		
		// this.INTERVAL_NAME = setInterval( () => {
		// 	this.props.LOAD_UNREAD_MSG_NUMBER(this.props.loginAccount);
		// },1000)
	}


  render() {
  	if(this.props.errorMsg) {
  		return (
  			<div className="homePage-wrapper container-fluid">
  			<div className="row">
  				<div className="col-12">
  					<h1>{this.props.errorMsg}</h1>
  				</div>
  			</div>
  		</div>
  		);
  	}else {
	  	return (
		  	<div className="homePage-wrapper container-fluid">
		  		<Router>
			  		<Route exact path = "/">
				  		<div className="row">
				  			<div className="col-lg-4">
				  				<Link to="/inventory">
				  					<img src="/assets/mainPageContainer/inventory.jpg"/>
				  				</Link>
				  			</div>
				  			<div className="col-lg-4">
				  				<Link to="/orders">
				  					<img src="/assets/mainPageContainer/orders.jpg"/>
				  				</Link>
				  			</div>

				  			<div className="col-lg-4">
				  				<Link to="/message">
				  					{this.props.unreadMsgNumber > 0?
				  						<p className="msgNumber-container">{this.props.unreadMsgNumber}</p> : null
				  					}
				  					<img src="/assets/mainPageContainer/message.jpg"/>
				  				</Link>
				  			</div>
				  		</div>
			  		</Route>
					<Route path = "/" component = {() => <Header userLoggedIn = {this.props.userLoggedIn} userInformation = {this.props.userInformation}/>}/>
				  	<Route exact path="/inventory" component = {()=> <Inventory userInformation = {this.props.userInformation}/>}/>
				  	<Route exact path="/orderediting" component = {(props) => <OrderEditing userInformation = {this.props.userInformation} order_id={props.location.state.order_id}/>}/>
				  	<Route exact path="/orders/orderreview" component = {(props)=><OrderReview userInformation = {this.props.userInformation} order_id={props.location.state.order_id}/>}/>
				  	<Route exact path="/orders" component = {()=> <Orders userInformation = {this.props.userInformation}/>}/>
				  	<Route exact path="/message" component = {()=> <Message userInformation = {this.props.userInformation}/>}/>

		  		</Router>
		  	</div>
		  	); 
	  	}
	}
}

const mapStateToPros = state => {
	//console.log(state);
	if(state.accounts) {	
		return {
			loginAccount: state.accounts.loginAccount,
			userLoggedIn: state.accounts.userLoggedIn,
			unreadMsgNumber: state.message.unreadMsgNumber,
			errorMsg: state.errMsg.errorMsg
		}
	}
	return {}
}

const mapDispatchToProps = dispatch => {
	return {
		LOAD_UNREAD_MSG_NUMBER: account => dispatch(MESSAGE_ACTION.LOAD_UNREAD_MSG_NUMBER(account))
	}
}


export default connect(mapStateToPros,mapDispatchToProps)(loggedInUser);