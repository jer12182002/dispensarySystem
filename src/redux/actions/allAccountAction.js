let chosenAccount = {
	accountName: null,
	chosenPassword: null,
	typedPassword: null
}


export function GET_ALL_ACCOUNTS () {
	return {
		type: "getAllAccounts"
	};
}

export function CHOOSE_ACCOUNT(account) {
	
	chosenAccount.accountName = account.account;
	console.log(chosenAccount);
}