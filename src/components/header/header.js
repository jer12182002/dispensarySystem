import React from 'react';
import './header.scss';
import {BrowserRouter as Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {USER_LOGOUT} from 'redux/actions/allAccountAction';
import * as headerAction from 'redux/actions/headerAction.js';

class header extends React.Component {

	render() {
		
		return (
			<header className = "container-fluid no-print">
				{this.props.userLoggedIn?
					<div className="row">
						<div className="col-6"> 
							<Link to="/"><h1>Dispensary - {this.props.userInformation.account}</h1></Link>
						</div>
						<div className="col-3">
							<Link to={this.props.headerPathUrl}><h1>{this.props.headerPathName}</h1></Link>
						</div> 
						<div className="logOut-container col-3">
							<h1 onClick= {USER_LOGOUT}>Log Out</h1>
						</div>
					</div>
					:
					<h1>Dispensary</h1>
				}
			</header>
		);
	}
}

const mapStateToProps = state => {
	return {
		headerPathName: state.header.pathName, 
		headerPathUrl: state.header.pathUrl
	}
}

export default connect(mapStateToProps, null)(header);
