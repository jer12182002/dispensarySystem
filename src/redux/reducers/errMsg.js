const ITEM_ERROR_MSG = "errMsg";
const NEW_ORDER_ERROR_MSG = "newOrderMsg";

export default (state = {}, action) =>{
	
	switch (action.type){
		case ITEM_ERROR_MSG: 
			return {errorMsg: action.payload};
			break;

		case NEW_ORDER_ERROR_MSG:
			return {errorMsg: action.payload};
			break;
		default:
			return {...state};
			
	}
}
