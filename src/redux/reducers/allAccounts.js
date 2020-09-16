const GET_LOGIN_PANEL = "getAllAccounts";
const LOGIN = "log_in";
const LOGOUT = "log_out";


let initAccounts = {
	loginAccount : {
		id : null, 
		account : null, 
		password :　null
	},
	allAccounts : 
		[
			{
				id : 1, 
				account : "Student", 
				password : process.env.REACT_APP_LOGINGPASSWORD_STUDENT, 
				img_src: "/assets/student.png"
			},
			{
				id : 2,
				account : "Professor",
				password : process.env.REACT_APP_LOGINGPASSWORD_PROFESSOR,
				img_src: "/assets/professor.png"
			},
			{
				id : 3, 
				account : "RenDeInc", 
				password : process.env.REACT_APP_LOGINGPASSWORD_RENDEINC,
				img_src: "/assets/rendeColleague.png"
			}	
		]
}

export default (state = {}, action) =>{
	switch (action.type){
	
		case GET_LOGIN_PANEL:
			let accounts = {...initAccounts};
			delete accounts.loginAccount;
			//accounts.allAccounts.forEach(account => delete account.password);

			return accounts.allAccounts;

		default:
			return state;
	}

}