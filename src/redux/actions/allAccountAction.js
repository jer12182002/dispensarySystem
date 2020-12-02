import {REMOVE_QUERY_CLASS,ADD_CLASS,SET_ATTRIBUTE} from 'redux/actions/helperFunctions';


let chosenAccount = {
	accountName: null,
	typedPassword: null
}




export const USER_LOGIN = () => {
	return {	
		type: "userLogin", 
		payload: chosenAccount
	};
}

export const USER_LOGOUT = () => {
	window.location.href = "/";	
}

//Event Functions
export const CHOOSE_ACCOUNT = (account, e) => {
	chosenAccount.accountName = account.account;
	REMOVE_QUERY_CLASS(".accounts-container img","clicked");
	ADD_CLASS(e.target, "clicked");
	document.querySelector("#loginPassword").focus();
}

export const TYPEING_PASSWORD = (e) => {
	return dispatch => {
		if(e.key === "Enter") {
			dispatch({	
				type: "userLogin", 
				payload: chosenAccount
			});
			
		}
		chosenAccount.typedPassword = e.target.value;
	}
}





