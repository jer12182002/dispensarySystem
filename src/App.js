import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './components/header/header';
import LoginPanel from './components/loginPanel/loginPanel';
import LoggedInUser from './components/loggedInUser/loggedInUser';



class App extends React.Component {
	render() {
	
	return (
	  	<div className="App">
				<Header userLoggedIn = {this.props.userLoggedIn}
						userInformation = {this.props.userInformation}			
				/>

		  		
		  		{this.props.userLoggedIn?
					<LoggedInUser userInformation = {this.props.userInformation}/>
				:
				<>
					<LoginPanel/>
				</>
		  		}
		</div>
	  );
	}

	}

const mapStateToProps = (state) => {
	
	return {
		userLoggedIn : state.accounts.userLoggedIn, 
		userInformation: state.accounts.loginAccount
	}
	
}

export default connect(mapStateToProps)(App);

