const ITEM_ERROR_MSG = "errMsg";

export default (state = {}, action) =>{
	
	switch (action.type){
		case ITEM_ERROR_MSG: 
			return {errorMsg: action.payload};
			break;

		default:
			return {...state};
			
	}
}
