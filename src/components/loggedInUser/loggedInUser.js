import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './loggedInUser.scss';

import Inventory from './inventory/inventory';
import NewOrder from './neworder/neworder';
import RecordedOrder from './recordedorder/recordedorder';
import Message from './message/message';


class loggedInUser extends React.Component {


  render() {

	  return (
	  	<div className="homePage-wrapper container-fluid">
	  		<Router>
		  		<Route exact path = "/">
			  		<div className="row">
			  			<div className="col-3">
			  				<Link to="/inventory">
			  					<img src="/assets/mainPageContainer/inventory.jpg"/>
			  				</Link>
			  			</div>
			  			<div className="col-3">
			  				<Link to="/neworder">
			  					<img src="/assets/mainPageContainer/neworder.jpg"/>
			  				</Link>
			  			</div>
			  			<div className="col-3">
			  				<Link to="/recordedorder">
			  					<img src="/assets/mainPageContainer/recordedorder.jpg"/>
			  				</Link>
			  			</div>

			  			<div className="col-3">
			  				<Link to="/message">
			  					<img src="/assets/mainPageContainer/message.jpg"/>
			  				</Link>
			  			</div>
			  		</div>
		  		</Route>
	
			  	<Route exact path="/inventory" component = {()=> <Inventory userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/neworder" component = {() => <NewOrder userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/recordedorder" component = {()=> <RecordedOrder userInformation = {this.props.userInformation}/>}/>
			  	<Route exact path="/message" component = {()=> <Message userInformation = {this.props.userInformation}/>}/>

	  		</Router>
	  	</div>

	  	) 
	}
}

export default loggedInUser;