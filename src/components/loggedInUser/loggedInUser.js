import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './loggedInUser.scss';

import Inventory from './inventory/inventory';
import NewOrder from './orders/neworder/neworder';
import Orders from './orders/orders';
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
	
			  	<Route exact path="/inventory" component = {()=> <Inventory userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/neworder" component = {() => <NewOrder userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/orders" component = {()=> <Orders userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/message" component = {()=> <Message userInformation = {this.props.userInformation}/>}/>

	  		</Router>
	  	</div>

	  	) 
	}
}

const mapStateToPros = state => {
	console.log(state);
	return {
		userLoggedIn: state.accounts.userLoggedIn
	}
}
export default connect(mapStateToPros)(loggedInUser);