const GET_LOGIN_PANEL = "getAllAccounts";
const USER_LOGIN = "userLogin";
const USER_LOGOUT = "userLogOut";


let initAccounts = { 
	userLoggedIn: false,
	logErrorMsg:'',
	loginAccount : {
		id : null, 
		account : null
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
		case USER_LOGIN: 

			let chosenAccount = action.payload;

			//check if user submit valid account and password. 
			//if it's valid, then update loginAccount. 
			//if not, then update login error Message
			initAccounts.userLoggedIn = initAccounts.allAccounts.some(account => {
				if(account.account === chosenAccount.accountName && account.password === chosenAccount.typedPassword) {
					initAccounts.loginAccount.id = account.id;
					initAccounts.loginAccount.account = account.account;
					initAccounts.logErrorMsg = '';
					return true;
				}
				else {
					initAccounts.logErrorMsg = 'Wrong password for the selected account!!!';
					return false;
				}
			});

			return {...initAccounts};
			break;


		case USER_LOGOUT:
		
			initAccounts.loginAccount = {
				id : null, 
				account : null
			}

			initAccounts.userLoggedIn = false;
			initAccounts.logErrorMsg = '';

			return {...initAccounts}
			break;
		
		default:
			let accounts = {...initAccounts};

			return accounts;
			
	}

}