import React from 'react';
import './loginPanel.scss';
import {connect} from 'react-redux';

import {CHOOSE_ACCOUNT,TYPEING_PASSWORD,USER_LOGIN} from 'redux/actions/allAccountAction';
//import * as LoginPaenlActions from 'redux/actions/allAccountAction';


class loginPanel extends React.Component {
	render() {

		const {USER_LOGIN} = this.props;
		return (
			<div className = "loginPanel-wrapper container-fluid">
				<div className="accounts-container row">
					{this.props.accounts.map(account => 
						<div key={account.id} className="col-12 col-md-4">
							<img src={account.img_src} onClick = { e=> {e.preventDefault();CHOOSE_ACCOUNT(account,e);}}/>
							<h1>{account.account}</h1>
						</div>
					)}
				</div>
				
				<div className="errorMessage-container row">
					<div className="col-12">
						<h1>{this.props.errorMsg}</h1>
					</div>
				</div>

				<div className="password-container row">
					<div className="col-12">
						<label>Password: </label>
						<input id="loginPassword" type="password" onKeyUp={ e => {e.preventDefault();this.props.PASSWORD_ENTER_SUBMIT(e)}}></input>
					</div>
					<div className="col-12">
						<button type="button" className="btn btn-success" onClick={USER_LOGIN}>Login</button>  
					</div>
				</div>
			</div>
			
		)
	}
}


const mapStateToProps = (state) => {

	return {
		accounts : state.accounts.allAccounts,
		errorMsg : state.accounts.logErrorMsg
	}
};

const mapDispatchToProps = dispatch => {
  return { 
    USER_LOGIN: () => dispatch(USER_LOGIN()), 
    PASSWORD_ENTER_SUBMIT: e => dispatch(TYPEING_PASSWORD(e))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(loginPanel)