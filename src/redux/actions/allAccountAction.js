import {REMOVE_QUERY_CLASS,ADD_CLASS} from 'redux/actions/helperFunctions';


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
	return {
		type: "userLogOut"
	}
}

//Event Functions
export const CHOOSE_ACCOUNT = (account, e) => {
	chosenAccount.accountName = account.account;
	REMOVE_QUERY_CLASS(".accounts-container img","clicked");
	ADD_CLASS(e.target, "clicked");
}

export const TYPEING_PASSWORD = (password) => {
	chosenAccount.typedPassword = password;
}





