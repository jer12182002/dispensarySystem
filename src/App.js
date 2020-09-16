import React from 'react';
import {connect} from 'react-redux';
import Header from './components/header/header';
import LoginPanel from './components/loginPanel/loginPanel';




class App extends React.Component {
	render() {
	
	return (
	  	<div className="App">
			<Header userLoggedIn = {this.props.userLoggedIn}
					userInformation = {this.props.userInformation}			
			/>
			
	  		{this.props.userLoggedIn?
			<></>
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

