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


class loggedInUser extends React.Component {

  render() {
	  return (
	  	<div className="homePage-wrapper container-fluid">
	  		<Router>
		  		<Route exact path = "/">
			  		<div className="row">
			  			<div className="col-4">
			  				<Link to="/inventory">
			  					<img src="/assets/mainPageContainer/inventory.jpg"/>
			  				</Link>
			  			</div>
			  			<div className="col-4">
			  				<Link to="/orders">
			  					<img src="/assets/mainPageContainer/orders.jpg"/>
			  				</Link>
			  			</div>

			  			<div className="col-4">
			  				<Link to="/message">
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

	  	) 
	}
}

const mapStateToPros = state => {
	return {
		userLoggedIn: state.accounts.userLoggedIn
	}
}
export default connect(mapStateToPros)(loggedInUser);