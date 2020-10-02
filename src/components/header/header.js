import React from 'react';
import './header.scss';
import {BrowserRouter as Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {USER_LOGOUT} from 'redux/actions/allAccountAction';

class header extends React.Component {

	render() {
		const {USER_LOGOUT} = this.props;

		return (
			<header className = "container-fluid">
				{this.props.userLoggedIn?
					<div className="row">
						<div className="col-8">
							<Link to="/">Dispensary - {this.props.userInformation.account}</Link>
						</div> 
						<div className="logOut-container col-4">
							<h1 onClick={USER_LOGOUT}>Log Out</h1>
						</div>
					</div>
					:
					<h1>Dispensary</h1>
				}
			</header>
		);
	}
}


const mapDispatchToProps = dispatch => {
  return { 
    USER_LOGOUT: () => dispatch(USER_LOGOUT())
  }
};


export default connect(null,mapDispatchToProps)(header);
