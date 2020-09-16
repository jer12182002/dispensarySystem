import React from 'react';
import './loginPanel.scss';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GET_ALL_ACCOUNTS,CHOOSE_ACCOUNT} from 'redux/actions/allAccountAction';
class loginPanel extends React.Component {


	render() {
		return (
			<div className = "loginPanel-wrapper container-fluid">
				<div className="accounts row">
					{this.props.accounts.accounts.map(account => 
						<div key={account.id} className="col-12 col-md-4">
							<img src={account.img_src} onClick={e=> {e.preventDefault();CHOOSE_ACCOUNT(account);}}/>
							<h1>{account.account}</h1>
						</div>
					)}
				</div>
				<div>
					<div className="row">
						<div className="col-12">
							<label>Password: </label>
							<input id="loginPassword" type="password"></input>
						</div>
					</div>

					<div className="errorMessage-wrapper row">

					</div>

					<div className="row">
						<div className="col-12">
							<button type="button" className="btn btn-success">Login</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		accounts : state
	}
};

const mapDispatchToProps = (dispatch) => {

	return dispatch(GET_ALL_ACCOUNTS());	
}

export default connect(mapStateToProps,mapDispatchToProps)(loginPanel)