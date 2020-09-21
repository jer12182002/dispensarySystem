const LOAD_ITEM_TYPE = 'loadItemType';

export default (state = {}, action) =>{
	
	switch (action.type){
		case LOAD_ITEM_TYPE: 

			return action.payload;
		break;


	
		
		default:
			console.log('default');

			return {...state};
			
	}
}
