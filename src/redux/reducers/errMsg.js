const ACCOUNT_ERROR = "accountError";
const ITEM_ERROR_MSG = "errMsg";
const ORDER_ERROR = "orderError"; 

export default (state = {}, action) =>{
	
	switch (action.type){
		case ITEM_ERROR_MSG: 
			return {errorMsg: action.payload};
			break;

		case ORDER_ERROR:
			return {errorMsg: action.payload};
			break;

		default:
			return {...state};
			
	}
}
